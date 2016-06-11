var Fetch = require('whatwg-fetch');
var Functions = require('./functions');
var apiUrl = "http://"+Functions.getHostname()+":3000/";

module.exports = window.api = {

	get: function(url) {
		return fetch(apiUrl + url).then(function(response) {
			return response.json();
		});
	},

	searchTrips: function(params) {
		return fetch(apiUrl + "trips", {
			data: params
		})
	},

	makeOrder: function(payload) {
		return fetch(apiUrl + "orders", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				"Authorization": $.cookie("tc_token"),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				trip_id: payload.trip_id,
				email: payload.email,
				transaction_id: payload.transaction_id
			})
		}).then(function(response){
			return response.json();
		});
	},

	sendPDF: function(trip_id, email) {
		return fetch(apiUrl + "send_email", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				"Authorization": $.cookie("tc_token"),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				trip_id: trip_id,
				email: email
			})
		}).then(function(response){
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

	getTripDetails: function (trip_id) {
		return fetch(apiUrl + "trips/" + trip_id).then(function(response){
			return response.json();
		}) ;
	},

	getUserOrders: function() {
		return fetch(apiUrl + "orders?user_email="+$.cookie("tc_current_user_email") , {
			headers: {
				"Authorization": $.cookie("tc_token")
			}
		}).then(function(response) {
			return response.json()
		});
	}
}