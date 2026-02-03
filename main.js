const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresets = require('./presets')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		
		// Initialize connection state
		this.connected = false
		this.baseUrl = ''
		this.reconnectInterval = null
		this.reconnectAttempts = 0
		this.maxReconnectAttempts = 0 // 0 = infinite retries
		this.reconnectDelay = 5000 // 5 seconds
	}

	async init(config) {
		this.config = config

		// Set up the base URL for API calls
		this.baseUrl = `http://${this.config.host}:${this.config.port}`

		// Update reconnection settings from config
		this.updateReconnectionSettings()

		// Test connection
		await this.testConnection()

		// Update variables with current settings
		this.updateVariableValues()

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets() // export presets
	}

	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
		this.connected = false
		this.stopReconnection()
	}

	async configUpdated(config) {
		this.config = config
		this.baseUrl = `http://${this.config.host}:${this.config.port}`
		
		// Update reconnection settings from config
		this.updateReconnectionSettings()
		
		// Stop any existing reconnection attempts
		this.stopReconnection()
		
		// Test connection after config update
		await this.testConnection()
		
		// Update variables with current settings
		this.updateVariableValues()
	}

	// Test connection to KeyFree Companion
	async testConnection() {
		try {
			const response = await fetch(`${this.baseUrl}/health`)
			if (response.ok) {
				this.connected = true
				this.updateStatus(InstanceStatus.Ok)
				this.log('info', 'Connected to KeyFree Companion')
				this.setVariableValues({
					connection_status: 'Connected',
					server_url: this.baseUrl,
					last_error: 'None',
				})
				// Stop reconnection attempts on successful connection
				this.stopReconnection()
				this.reconnectAttempts = 0
				// Update variables to reflect successful connection
				this.setVariableValues({
					reconnect_attempts: '0',
				})
			} else {
				this.handleConnectionFailure(`HTTP ${response.status}`)
			}
		} catch (error) {
			this.handleConnectionFailure(error.message)
		}
	}

	// Update reconnection settings from config
	updateReconnectionSettings() {
		if (this.config.auto_reconnect !== undefined) {
			// Auto-reconnect is enabled by default, but can be disabled
		}
		if (this.config.reconnect_delay !== undefined) {
			this.reconnectDelay = parseInt(this.config.reconnect_delay) * 1000 // Convert to milliseconds
		}
		if (this.config.max_reconnect_attempts !== undefined) {
			this.maxReconnectAttempts = parseInt(this.config.max_reconnect_attempts)
		}
	}

	// Update variable values
	updateVariableValues() {
		this.setVariableValues({
			server_url: this.baseUrl,
			reconnect_attempts: this.reconnectAttempts.toString(),
			auto_reconnect_enabled: this.config.auto_reconnect !== false ? 'Yes' : 'No',
		})
	}

	// Handle connection failure and start reconnection if needed
	handleConnectionFailure(errorMessage) {
		this.connected = false
		this.updateStatus(InstanceStatus.ConnectionFailure)
		this.log('error', `Connection error: ${errorMessage}`)
		this.setVariableValues({
			connection_status: 'Error',
			last_error: errorMessage,
		})
		
		// Start reconnection attempts if auto-reconnect is enabled and not already trying
		if (this.config.auto_reconnect !== false && !this.reconnectInterval) {
			this.startReconnection()
		}
	}

	// Start automatic reconnection attempts
	startReconnection() {
		if (this.reconnectInterval) {
			return // Already reconnecting
		}

		this.log('info', 'Starting automatic reconnection attempts...')
		this.setVariableValues({
			connection_status: 'Reconnecting',
		})

		this.reconnectInterval = setInterval(async () => {
			// Check if we've exceeded max attempts (if set)
			if (this.maxReconnectAttempts > 0 && this.reconnectAttempts >= this.maxReconnectAttempts) {
				this.log('warn', 'Maximum reconnection attempts reached')
				this.stopReconnection()
				return
			}

			this.reconnectAttempts++
			this.log('info', `Reconnection attempt ${this.reconnectAttempts}...`)
			
			// Update variables with current attempt count
			this.setVariableValues({
				reconnect_attempts: this.reconnectAttempts.toString(),
			})
			
			await this.testConnection()
		}, this.reconnectDelay)
	}

	// Stop automatic reconnection attempts
	stopReconnection() {
		if (this.reconnectInterval) {
			clearInterval(this.reconnectInterval)
			this.reconnectInterval = null
			this.log('debug', 'Stopped reconnection attempts')
		}
	}

	// Make API call to KeyFree Companion (returns true/false for success)
	async makeApiCall(endpoint, method = 'POST', data = null) {
		const result = await this.makeApiCallWithResponse(endpoint, method, data)
		return result !== null
	}

	// Make API call and return response body as parsed JSON (or null on failure)
	async makeApiCallWithResponse(endpoint, method = 'POST', data = null) {
		if (!this.connected) {
			this.log('warn', 'Not connected to KeyFree Companion')
			if (this.config.auto_reconnect !== false && !this.reconnectInterval) {
				this.startReconnection()
			}
			return null
		}

		try {
			const options = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
			}

			if (data && method !== 'GET') {
				options.body = JSON.stringify(data)
			}

			const response = await fetch(`${this.baseUrl}${endpoint}`, options)

			if (response.ok) {
				this.log('debug', `API call successful: ${endpoint}`)
				const text = await response.text()
				if (!text) return true
				try {
					return JSON.parse(text)
				} catch {
					return text
				}
			} else {
				this.log('error', `API call failed: ${endpoint} - ${response.status}`)
				this.handleConnectionFailure(`API call failed: ${response.status}`)
				return null
			}
		} catch (error) {
			this.log('error', `API call error: ${endpoint} - ${error.message}`)
			this.handleConnectionFailure(`API call error: ${error.message}`)
			return null
		}
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'KeyFree Companion IP',
				width: 8,
				regex: Regex.IP,
				default: '127.0.0.1',
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'KeyFree Companion Port',
				width: 4,
				regex: Regex.PORT,
				default: '3000',
			},
			{
				type: 'checkbox',
				id: 'auto_reconnect',
				label: 'Enable Auto-Reconnection',
				width: 12,
				default: true,
			},
			{
				type: 'textinput',
				id: 'reconnect_delay',
				label: 'Reconnection Delay (seconds)',
				width: 6,
				regex: Regex.NUMBER,
				default: '5',
			},
			{
				type: 'textinput',
				id: 'max_reconnect_attempts',
				label: 'Max Reconnection Attempts (0 = infinite)',
				width: 6,
				regex: Regex.NUMBER,
				default: '0',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
