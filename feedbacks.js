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
	})
}
