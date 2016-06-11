var React = require('react');

module.exports = {

	generateToken: function() {
		var random = function() {
			return Math.random().toString(36).substr(2);
		}
		return random() + random();
	},

	getHostname: function() {
		// Get hostname without port
		return $(location).attr('hostname');
	},

	getHost: function() {
		// Get hostname with port
		return $(location).attr('host');
	}
	
};