const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		connection_status: {
			name: 'Connection Status',
			type: 'boolean',
			label: 'Connected to KeyFree Companion',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: (feedback) => {
				return self.connected
			},
		},
		connection_failure: {
			name: 'Connection Failure',
			type: 'boolean',
			label: 'Connection Failed',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: (feedback) => {
				return !self.connected
			},
		},
		volume_level: {
			name: 'Volume Level',
			type: 'advanced',
			label: 'Volume level for app',
			options: [],
			callback: async () => {
				const result = await self.makeApiCallWithResponse('/api/volume/get?app=chrome.exe', 'GET')
				if (result == null || typeof result !== 'object') return {}
				const vol = result.volume != null ? Math.round(Number(result.volume) * 100) : null
				return {
					text: vol != null ? `${vol}%` : '--',
				}
			},
		},
		volume_muted: {
			name: 'Volume Muted',
			type: 'boolean',
			label: 'App is muted',
			defaultStyle: {
				bgcolor: combineRgb(80, 80, 80),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: async () => {
				const result = await self.makeApiCallWithResponse('/api/volume/get?app=chrome.exe', 'GET')
				if (result == null || typeof result !== 'object') return false
				return result.muted === true
			},
		},
	})
}
