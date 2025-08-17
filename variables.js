module.exports = function (self) {
	self.setVariableDefinitions([
		{ variableId: 'connection_status', name: 'Connection Status' },
		{ variableId: 'server_url', name: 'Server URL' },
		{ variableId: 'last_action', name: 'Last Action Executed' },
		{ variableId: 'last_error', name: 'Last Error Message' },
	])

	// Set initial variable values
	self.setVariableValues({
		connection_status: 'Disconnected',
		server_url: `${self.config?.host || '127.0.0.1'}:${self.config?.port || '3000'}`,
		last_action: 'None',
		last_error: 'None',
	})
}
