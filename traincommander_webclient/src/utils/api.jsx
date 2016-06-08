var Fetch = require('whatwg-fetch');
var apiUrl = "http://localhost:3000/";

module.exports = window.api = {

	get: function(url) {
		return fetch(apiUrl + url).then(function(response) {
			return response.json();
		});
	},

	getTrains: function () {
		return fetch(apiUrl + "trains").then(function(response){
			console.log(response);
			return response.json();
		}) ;
	},

	getTrips: function () {
		return fetch(apiUrl + "trips").then(function(response){
			return response.json();
		}) ;
	},

	getWithParams: function(url, params) {
		return $.get(url, params).done(function(data){
			return data;	
		})
	}
}