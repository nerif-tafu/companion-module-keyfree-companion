const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		
		// Initialize connection state
		this.connected = false
		this.baseUrl = ''
	}

	async init(config) {
		this.config = config

		// Set up the base URL for API calls
		this.baseUrl = `http://${this.config.host}:${this.config.port}`

		// Test connection
		await this.testConnection()

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}

	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
		this.connected = false
	}

	async configUpdated(config) {
		this.config = config
		this.baseUrl = `http://${this.config.host}:${this.config.port}`
		
		// Test connection after config update
		await this.testConnection()
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
			} else {
				this.connected = false
				this.updateStatus(InstanceStatus.ConnectionFailure)
				this.log('warn', 'Failed to connect to KeyFree Companion')
				this.setVariableValues({
					connection_status: 'Failed',
					last_error: `HTTP ${response.status}`,
				})
			}
		} catch (error) {
			this.connected = false
			this.updateStatus(InstanceStatus.ConnectionFailure)
			this.log('error', `Connection error: ${error.message}`)
			this.setVariableValues({
				connection_status: 'Error',
				last_error: error.message,
			})
		}
	}

	// Make API call to KeyFree Companion
	async makeApiCall(endpoint, method = 'POST', data = null) {
		if (!this.connected) {
			this.log('warn', 'Not connected to KeyFree Companion')
			return false
		}

		try {
			const options = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
			}

			if (data) {
				options.body = JSON.stringify(data)
			}

			const response = await fetch(`${this.baseUrl}${endpoint}`, options)
			
			if (response.ok) {
				this.log('debug', `API call successful: ${endpoint}`)
				return true
			} else {
				this.log('error', `API call failed: ${endpoint} - ${response.status}`)
				return false
			}
		} catch (error) {
			this.log('error', `API call error: ${endpoint} - ${error.message}`)
			return false
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
}

runEntrypoint(ModuleInstance, UpgradeScripts)
