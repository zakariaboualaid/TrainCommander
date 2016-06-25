var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({

	getTrains: function() {
		api.getTrains().then(function(data) {
			this.trains = data;
			this.trigger('change', this.trains);
		}.bind(this));
	}

})