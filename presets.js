const { combineRgb } = require('@companion-module/base')

module.exports = function (self) {
	const presets = {}

	// Helper function to create preset for a specific combination
	const createPreset = (page, row, fKey, arrowKey, keypadNum) => {
		const presetId = `page${page}_row${row}_${fKey}_${arrowKey}_keypad${keypadNum}`
		const displayText = `${fKey.toUpperCase()}+${arrowKey.toUpperCase()}+KP${keypadNum}`
		
		presets[presetId] = {
			type: 'button',
			category: `Page ${page}`,
			name: displayText,
			style: {
				text: displayText,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'trio_keys',
							options: {
								key1: fKey,
								key2: arrowKey,
								key3: `keypad${keypadNum}`,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// Page 1 - F13 combinations
	// Row 1: F13 + uparrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(1, 1, 'f13', 'up', i)
	}
	
	// Row 2: F13 + downarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(1, 2, 'f13', 'down', i)
	}
	
	// Row 3: F13 + leftarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(1, 3, 'f13', 'left', i)
	}
	
	// Row 4: F13 + rightarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(1, 4, 'f13', 'right', i)
	}

	// Page 2 - F14 combinations
	// Row 1: F14 + uparrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(2, 1, 'f14', 'up', i)
	}
	
	// Row 2: F14 + downarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(2, 2, 'f14', 'down', i)
	}
	
	// Row 3: F14 + leftarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(2, 3, 'f14', 'left', i)
	}
	
	// Row 4: F14 + rightarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(2, 4, 'f14', 'right', i)
	}

	// Page 3 - F15 combinations
	// Row 1: F15 + uparrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(3, 1, 'f15', 'up', i)
	}
	
	// Row 2: F15 + downarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(3, 2, 'f15', 'down', i)
	}
	
	// Row 3: F15 + leftarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(3, 3, 'f15', 'left', i)
	}
	
	// Row 4: F15 + rightarrow + keypad1-7
	for (let i = 1; i <= 7; i++) {
		createPreset(3, 4, 'f15', 'right', i)
	}

	self.setPresetDefinitions(presets)
}
