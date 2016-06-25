var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({

	listenables: [Actions],

	getStations: function() {
		api.getStations().then(function(data) {
			this.stations = data;
			this.trigger('change', this.stations);
		}.bind(this));
	}

})