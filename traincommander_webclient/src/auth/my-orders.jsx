var React = require('react');
React.Bootstrap = require('react-bootstrap');
var Table = require('react-bootstrap/lib/table');
var ReactRouter = require('react-router');
var moment = require('moment');
var browserHistory = ReactRouter.browserHistory;
module.exports = React.createClass({

	getInitialState:function() {
	    return {
	          orders: []
	    };
	},

	componentWillMount: function() {
		if($.cookie('tc_token') == null){
			browserHistory.push('/')
		} else {
			// this.apiGetData()
		}
	},

	componentDidMount: function() {
		this.apiGetData()
	},

	apiGetData: function() {
		api.getUserOrders().then(function(data){
			this.setState({orders: data})
		}.bind(this));
	},

	renderOrders: function() {
		var orders = this.state.orders.map(function(order) {
			var trip = order.trip
			console.log(order)
			return <tr key={order.id}>
				<td>{order.transaction_id}</td>
				<td>{}</td>
				<td>{trip.price} EUR</td>
				<td>{moment(order.order_time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
				<td><a href="#" onClick={this.printTicket}>Print ticket</a></td>
			</tr>
		});
		return <div className=""><Table condensed={true} striped={true} hover={true} className="user_orders">
			<thead>
				<tr>
					<th>Transaction ID</th>
					<th>Trip</th>
					<th>Price</th>
					<th>Order Time</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{orders}
			</tbody>
		</Table>
		</div>
	},

    render: function() {
		return <div className="col-md-12"><div className="panel panel-default">
			<div className="panel-heading">My Orders</div>
			<div className="panel-body">
				{this.renderOrders()}
			</div>
		</div>
		</div>
    }
});