var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({

	listenables: [Actions],

	getAllTrips: function() {
		api.getAllTrips().then(function(data) {
			this.trips = data;
			this.trigger('change', this.trips);
		}.bind(this));
	},

	getTrips: function(params) {
		api.getTrips(params).then(function(data) {
			this.trips = data;
			this.trigger('change', this.trips);
		}.bind(this));
	}

})