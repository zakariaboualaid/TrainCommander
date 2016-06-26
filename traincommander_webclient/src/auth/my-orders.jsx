var React = require('react');
React.Bootstrap = require('react-bootstrap');
var Table = require('react-bootstrap/lib/table');
var ReactRouter = require('react-router');
var moment = require('moment');
var Functions = require('../utils/functions')
var browserHistory = ReactRouter.browserHistory;
var OrderStore = require('../stores/orders-store');
var Reflux = require('reflux');
var Actions = require('../actions');
var Ticket = require('../shared/ticket');

module.exports = React.createClass({

	mixins: [
		Reflux.listenTo(OrderStore, 'onChange')
	],

	getInitialState:function() {
	    return {
	          orders: []
	    };
	},

	componentWillMount: function() {
		if($.cookie('tc_token') == null){
			browserHistory.push('/')
		} else {
			Actions.getUserOrders();
		}
	},

	onChange: function(event, orders) {
		this.setState({orders: orders});
	},

	printTicket: function(order) {
		Ticket.buildTicket(order);
	},

	submitReplicateTrip: function(order) {
		$(".form_replicate_trip").submit();
	},

	renderOrders: function() {
		if(this.state.orders.length == 0){
			return <p className="text-center">{"You don't have any order until now."}</p>
		}
		var orders = this.state.orders.map(function(order) {
			var trip = order.trip
			var order_time = moment(order.order_time).format("MMMM Do YYYY, h:mm:ss a")
			var departure_time = moment(order.trip.departure_time).format("MMMM Do YYYY, h:mm:ss a")
			return <tr id={order.id} key={order.id}>
				<td><span style={{fontSize: "12px"}} className="badge">#{order.transaction_id}</span></td>
				<td>{order.title}</td>
				<td>{trip.price} EUR</td>
				<td>{order_time}</td>
				<td>{departure_time}</td>
				<td>
					<div style={{display: ""}} className="btn-group orders-options">
					  <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					     <span style={{height: "10px", marginTop: "8px"}} className="caret"></span>
					  </button>
					  <ul className="dropdown-menu text-left">
					    <li><a href="#" className="btn btn-link btn-xs" onClick={this.printTicket.bind(this, order)}>Print ticket</a></li>
					    <li>
						<React.Bootstrap.Form className="form_replicate_trip" action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
							<input type="hidden" name="cmd" value="_xclick"/>
							<input type="hidden" name="business" value="boulaidzac-facilitator@gmail.com"/>
							<input type="hidden" name="return" value={"http://"+Functions.getHost()+"/success"} />
							<input type="hidden" name="currency_code" value="EUR"/>
							<input type="hidden" name="quantity" value="1"/>
							<input type="hidden" name="item_name" value={order.title} />
							<input type="hidden" name="item_number" value={trip.id}/>
							<input type="hidden" name="amount" value={trip.price} />
							<input type="hidden" name="hosted_button_id" value="PUXW2HB25RFP2"/>
							<img alt="" border="0" src="../img/paypal_please.png" width="1" height="1"/>
						</React.Bootstrap.Form>
						<a href="#" onClick={this.submitReplicateTrip} className="btn btn-link btn-xs">Replicate trip</a>
						</li>
					  </ul>
					</div>
				</td>
			</tr>
		}.bind(this));
		return <div className=""><Table condensed={false} striped={true} hover={true} className="user_orders">
			<thead>
				<tr>
					<th>Transaction ID</th>
					<th>Trip</th>
					<th>Price</th>
					<th>Order Time</th>
					<th>Departure Time</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{orders}
			</tbody>
		</Table>
		</div>
	},

    render: function() {
		return <div className="col-md-12 list_orders_panel"><div className="panel panel-default">
			<div className="panel-heading">My Orders</div>
			<div className="panel-body">
				{this.renderOrders()}
			</div>
		</div>
		</div>
    }
});