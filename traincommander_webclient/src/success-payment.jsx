var React = require('react');
var Api = require('./utils/api');
var Fetch = require('whatwg-fetch');
var moment = require('moment');
var Functions = require('./utils/functions');
var Ticket = require('./shared/ticket');

module.exports = React.createClass({

	getInitialState: function() {
	    return {
	          trip: {},
	          order: {},
	          from: {},
	          to: {},
	          train: {},
	          transaction_id: null
	    };
	},

	componentDidMount:function() {
		if(this.props.location.query.item_number != null && this.props.location.query.tx != null){
			this.setState({transaction_id: this.props.location.query.tx})
			var payload = {
				trip_id: this.props.location.query.item_number,
				transaction_id: this.props.location.query.tx,
				email: $.cookie("tc_current_user_email")
			}
			Api.getTripDetails(payload.trip_id).then(function(data){
				this.setState({trip: data, from: data.from, to: data.to, train: data.train})
				if(Functions.currentUserSignedIn()){
					this.makeOrder(payload);
					this.sendEmailWithPDF(payload);
				}
			}.bind(this))
		}
	},

	sendEmailWithPDF: function(trip_id, email) {
		console.log("Sending email with PDF");
		Api.sendPDF(trip_id, email);
	},

	makeOrder: function(trip_id, email) {
		Api.makeOrder(trip_id, email).then(function(data){
			this.setState({order: data});
		}.bind(this));
	},

	printTicket: function() {
		if(this.state.order){
			console.log(this.state.order)
			Ticket.buildTicket(this.state.order);
		} else {
			alert("Error occured, contact admins.");
		}
	},

	proceedTransaction: function() {
		var form = document.querySelector('form#proceed_transaction')
		fetch("https://www.sandbox.paypal.com/cgi-bin/webscr", {
			method: "post",
			headers: {
				"Access-Control-Allow-Credentials": true,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: JSON.stringify({
				cmd: "_notify-synch",
				tx: this.state.transaction_id,
				at: "Cc-4tbcu9loqIwpOk9i8CrlGy3TXixaq8Fj1Ut7PLpVRdxz_zmwuJIuRAGm"
			})
		}).then(function(response){
			console.log(response);
		});
	},

	render: function() {
		return <div className="panel panel-default">
			<div className="panel-heading">Order Invoice</div>
			<div className="panel-body">
				<h3 className="text-center" style={{color:"#5cb85c"}}>Success! Your payment was successful.</h3><br/><br/>
				<div className="well center-block col-md-4 col-lg-4 col-sm-6" style={{display: "block", float: "none"}}>
					<h4 class="no-print">Trip Information</h4>
					<br/>
					<div id="ticket">
					<p>Transaction ID : <strong>#{this.state.transaction_id}</strong></p>
					<p>From : <strong>{this.state.from.name}</strong></p>
					<p>To : <strong>{this.state.to.name}</strong></p>
					<p>Departure Time : <strong>{moment(this.state.trip.departure_time).format("ddd, hA")}</strong></p>
					<p>Price : <strong>{this.state.trip.price} EUR</strong></p>
					</div>
					<div className="text-center no-print">
						<br/>
						<input className="btn btn-success" type="button" onClick={this.printTicket} value="Print my ticket" />
						<form style={{display: "none"}} id="proceed_transaction" method="post" action="https://www.sandbox.paypal.com/cgi-bin/webscr">
							<input type="hidden" name="cmd" value="_notify-synch"/>
							<input type="hidden" name="tx" value={this.state.transaction_id}/>
							<input type="hidden" name="at" value="Cc-4tbcu9loqIwpOk9i8CrlGy3TXixaq8Fj1Ut7PLpVRdxz_zmwuJIuRAGm"/>
							<input className="btn btn-default" onClick={this.proceedTransaction} type="button" value="Proceed transaction"/>
						</form>

					</div>
				</div>
				<iframe id="ifmcontentstoprint" style={{height: "220px", width: "220px", position: "absolute", display: "none"}}></iframe>
				<br/>
			</div>
		</div>
	}
});