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
	},

	getGoogleClientID: function() {
		return "198477065196-g228hjcc33v05iv9c5s5lmh7bd6kmv8h.apps.googleusercontent.com"
	},

	currentUserSignedIn: function(){
		return ($.cookie("tc_token") != null && $.cookie("tc_current_user_email") != null)
	}
	
};