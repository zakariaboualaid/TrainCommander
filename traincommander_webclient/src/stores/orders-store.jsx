var Api = require('../utils/api.jsx');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({

	listenables: [Actions],

	getOrders: function() {
		return Api.get("orders")
			.then(function(data){
				this.orders = data;
			}.bind(this));
	},

	getUserOrders: function() {
		return Api.getUserOrders()
			.then(function(data){
				this.orders = data;
				this.triggerChange();
		}.bind(this));
	},

	triggerChange: function() {
		this.trigger('change', this.orders);
	}

})