// Build app/pid payload for volume API (use pid if set, else app)
function volumeTarget(options) {
	if (options.pid !== undefined && options.pid !== '' && String(options.pid).trim() !== '') {
		return { pid: parseInt(options.pid, 10) }
	}
	if (options.app !== undefined && String(options.app).trim() !== '') {
		return { app: String(options.app).trim() }
	}
	return null
}

module.exports = function (self) {
	// Define all supported keys for dropdowns
	const supportedKeys = [
		// Letters
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
		'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		// Numbers
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		// Function Keys
		'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24',
		// Modifier Keys
		'ctrl', 'left_ctrl', 'right_ctrl',
		'shift', 'left_shift', 'right_shift',
		'alt', 'left_alt', 'right_alt',
		'meta', 'left_meta', 'right_meta',
		// Special Keys
		'enter', 'space', 'tab', 'escape',
		'backspace', 'delete', 'insert',
		'home', 'end', 'pageup', 'pagedown',
		// Arrow Keys
		'up', 'down', 'left', 'right',
		// Keypad Keys
		'keypad0', 'keypad1', 'keypad2', 'keypad3', 'keypad4', 'keypad5', 'keypad6', 'keypad7', 'keypad8', 'keypad9',
		'keypad_enter', 'keypad_plus', 'keypad_minus', 'keypad_multiply', 'keypad_divide', 'keypad_decimal',
		// Punctuation and Symbols
		'`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_',
		'=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '.',
		'/', '?', '<', '>'
	]

	self.setActionDefinitions({
		// Single key press
		single_key: {
			name: 'Single Key Press',
			options: [
				{
					id: 'key',
					type: 'dropdown',
					label: 'Key',
					default: 'a',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
			],
			callback: async (event) => {
				const success = await self.makeApiCall('/api/single', 'POST', {
					key: event.options.key.toLowerCase(),
				})
				if (success) {
					self.log('info', `Pressed key: ${event.options.key}`)
					self.setVariableValues({
						last_action: `Single Key: ${event.options.key}`,
					})
				}
			},
		},

		// Two-key combination
		duo_keys: {
			name: 'Two-Key Combination',
			options: [
				{
					id: 'key1',
					type: 'dropdown',
					label: 'First Key',
					default: 'ctrl',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
				{
					id: 'key2',
					type: 'dropdown',
					label: 'Second Key',
					default: 'c',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
			],
			callback: async (event) => {
				const success = await self.makeApiCall('/api/duo', 'POST', {
					key1: event.options.key1.toLowerCase(),
					key2: event.options.key2.toLowerCase(),
				})
				if (success) {
					self.log('info', `Pressed combination: ${event.options.key1} + ${event.options.key2}`)
					self.setVariableValues({
						last_action: `Duo: ${event.options.key1} + ${event.options.key2}`,
					})
				}
			},
		},

		// Three-key combination
		trio_keys: {
			name: 'Three-Key Combination',
			options: [
				{
					id: 'key1',
					type: 'dropdown',
					label: 'First Key',
					default: 'meta',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
				{
					id: 'key2',
					type: 'dropdown',
					label: 'Second Key',
					default: 'shift',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
				{
					id: 'key3',
					type: 'dropdown',
					label: 'Third Key',
					default: 's',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
			],
			callback: async (event) => {
				const success = await self.makeApiCall('/api/trio', 'POST', {
					key1: event.options.key1.toLowerCase(),
					key2: event.options.key2.toLowerCase(),
					key3: event.options.key3.toLowerCase(),
				})
				if (success) {
					self.log('info', `Pressed combination: ${event.options.key1} + ${event.options.key2} + ${event.options.key3}`)
					self.setVariableValues({
						last_action: `Trio: ${event.options.key1} + ${event.options.key2} + ${event.options.key3}`,
					})
				}
			},
		},

		// Four-key combination
		quad_keys: {
			name: 'Four-Key Combination',
			options: [
				{
					id: 'key1',
					type: 'dropdown',
					label: 'First Key',
					default: 'ctrl',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
				{
					id: 'key2',
					type: 'dropdown',
					label: 'Second Key',
					default: 'alt',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
				{
					id: 'key3',
					type: 'dropdown',
					label: 'Third Key',
					default: 'shift',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
				{
					id: 'key4',
					type: 'dropdown',
					label: 'Fourth Key',
					default: 'delete',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
			],
			callback: async (event) => {
				const success = await self.makeApiCall('/api/quartet', 'POST', {
					key1: event.options.key1.toLowerCase(),
					key2: event.options.key2.toLowerCase(),
					key3: event.options.key3.toLowerCase(),
					key4: event.options.key4.toLowerCase(),
				})
				if (success) {
					self.log('info', `Pressed combination: ${event.options.key1} + ${event.options.key2} + ${event.options.key3} + ${event.options.key4}`)
					self.setVariableValues({
						last_action: `Quad: ${event.options.key1} + ${event.options.key2} + ${event.options.key3} + ${event.options.key4}`,
					})
				}
			},
		},

		// Key down
		key_down: {
			name: 'Key Down',
			options: [
				{
					id: 'key',
					type: 'dropdown',
					label: 'Key',
					default: 'shift',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
			],
			callback: async (event) => {
				const success = await self.makeApiCall('/api/down', 'POST', {
					key: event.options.key.toLowerCase(),
				})
				if (success) {
					self.log('info', `Key down: ${event.options.key}`)
					self.setVariableValues({
						last_action: `Key Down: ${event.options.key}`,
					})
				}
			},
		},

		// Key up
		key_up: {
			name: 'Key Up',
			options: [
				{
					id: 'key',
					type: 'dropdown',
					label: 'Key',
					default: 'shift',
					choices: supportedKeys.map(key => ({ id: key, label: key })),
				},
			],
			callback: async (event) => {
				const success = await self.makeApiCall('/api/up', 'POST', {
					key: event.options.key.toLowerCase(),
				})
				if (success) {
					self.log('info', `Key up: ${event.options.key}`)
					self.setVariableValues({
						last_action: `Key Up: ${event.options.key}`,
					})
				}
			},
		},

		// Type string
		type_string: {
			name: 'Type String',
			options: [
				{
					id: 'text',
					type: 'textinput',
					label: 'Text to Type',
					default: 'Hello, World!',
				},
			],
			callback: async (event) => {
				const success = await self.makeApiCall('/api/string', 'POST', {
					text: event.options.text,
				})
				if (success) {
					self.log('info', `Typed string: ${event.options.text}`)
					self.setVariableValues({
						last_action: `Type: "${event.options.text.substring(0, 20)}${event.options.text.length > 20 ? '...' : ''}"`,
					})
				}
			},
		},

		// --- Volume control actions ---

		volume_set: {
			name: 'Volume: Set Level',
			options: [
				{ id: 'app', type: 'textinput', label: 'Application (e.g. chrome.exe)', default: 'chrome.exe' },
				{ id: 'pid', type: 'textinput', label: 'PID (optional, overrides app)', default: '' },
				{ id: 'volume', type: 'number', label: 'Volume (0–100 %)', default: 80, min: 0, max: 100 },
			],
			callback: async (event) => {
				const target = volumeTarget(event.options)
				if (!target) {
					self.log('warn', 'Volume set: specify app or pid')
					return
				}
				const vol = Math.min(100, Math.max(0, Number(event.options.volume))) / 100
				const success = await self.makeApiCall('/api/volume/set', 'POST', { ...target, volume: vol })
				if (success) {
					self.setVariableValues({ last_action: `Volume: Set ${target.app || target.pid} to ${event.options.volume}%` })
				}
			},
		},

		volume_change: {
			name: 'Volume: Change Level',
			options: [
				{ id: 'app', type: 'textinput', label: 'Application (e.g. chrome.exe)', default: 'chrome.exe' },
				{ id: 'pid', type: 'textinput', label: 'PID (optional, overrides app)', default: '' },
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 'increase',
					choices: [
						{ id: 'increase', label: 'Increase volume' },
						{ id: 'decrease', label: 'Decrease volume' },
					],
				},
				{ id: 'amount', type: 'number', label: 'Amount (0–1, default 0.1)', default: 0.1, min: 0, max: 1, step: 0.05 },
			],
			callback: async (event) => {
				const target = volumeTarget(event.options)
				if (!target) {
					self.log('warn', 'Volume change: specify app or pid')
					return
				}
				const endpoint = event.options.direction === 'decrease' ? '/api/volume/down' : '/api/volume/up'
				const amount = Number(event.options.amount)
				const body = amount > 0 ? { ...target, amount } : target
				const success = await self.makeApiCall(endpoint, 'POST', body)
				if (success) {
					const dir = event.options.direction === 'decrease' ? 'Down' : 'Up'
					self.setVariableValues({ last_action: `Volume: ${dir} ${target.app || target.pid}` })
				}
			},
		},

		volume_mute: {
			name: 'Volume: Mute',
			options: [
				{ id: 'app', type: 'textinput', label: 'Application (e.g. chrome.exe)', default: 'chrome.exe' },
				{ id: 'pid', type: 'textinput', label: 'PID (optional, overrides app)', default: '' },
				{
					id: 'mute_action',
					type: 'dropdown',
					label: 'Action',
					default: 'toggle',
					choices: [
						{ id: 'toggle', label: 'Toggle' },
						{ id: 'mute', label: 'Mute' },
						{ id: 'unmute', label: 'Unmute' },
					],
				},
			],
			callback: async (event) => {
				const target = volumeTarget(event.options)
				if (!target) {
					self.log('warn', 'Volume mute: specify app or pid')
					return
				}
				const action = event.options.mute_action || 'toggle'
				if (action === 'toggle') {
					const result = await self.makeApiCallWithResponse('/api/volume/toggle-mute', 'POST', target)
					if (result != null && typeof result === 'object') {
						const muted = result.muted === true ? 'Muted' : 'Unmuted'
						self.setVariableValues({
							last_action: `Volume: Toggle mute ${target.app || target.pid} → ${muted}`,
							volume_muted: muted,
						})
					}
				} else {
					const endpoint = action === 'mute' ? '/api/volume/mute' : '/api/volume/unmute'
					const success = await self.makeApiCall(endpoint, 'POST', target)
					if (success) {
						self.setVariableValues({ last_action: `Volume: ${action === 'mute' ? 'Mute' : 'Unmute'} ${target.app || target.pid}` })
					}
				}
			},
		},
	})
}
