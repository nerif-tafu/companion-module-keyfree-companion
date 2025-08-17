module.exports = function (self) {
	// Define all supported keys for dropdowns
	const supportedKeys = [
		// Letters
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
		'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		// Numbers
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		// Function Keys
		'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
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
	})
}
