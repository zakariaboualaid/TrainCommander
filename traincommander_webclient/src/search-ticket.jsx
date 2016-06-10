var React = require('react');
var Api = require('./utils/api')
React.Bootstrap = require('react-bootstrap');
var DateTimePicker = require('react-bootstrap-datetimepicker');
var moment = require('moment');
// React.Bootstrap.Select = require('react-bootstrap-select');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			stations: [],
			trips: [],
			loading: false
		};
	},

	apiGetData: function(){
		Api.get("stations").then(function(data){
			this.setState({stations: data})
		}.bind(this))
		Api.get("trips").then(function(data){
			this.setState({trips: data})
		}.bind(this))
	},

	componentWillMount: function() {
		this.apiGetData()
	},

	searchTrips: function() {
	},

	buyTicket: function(){
	},

	results: function(){
		if(this.state.trips.length == 0) {
			return <h4>Search for a ticket</h4>
		} else {
			return this.returnTripsTable()
		}
	},

	returnTripsTable: function(){
		var trips = this.state.trips.map(function(trip){
			return <tr key={trip.id}>
					<td>{trip.train.name}</td>
					<td>{trip.from.name}</td>
					<td>{trip.to.name}</td>
					<td>{moment(trip.departure_time).format("ddd, hA")}</td>
					<td>{moment.duration(parseInt(trip.total_travel_time), "seconds").humanize()}</td>
					<td>	
						<React.Bootstrap.Form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
							<input type="hidden" name="cmd" value="_xclick"/>
							<input type="hidden" name="business" value="boulaidzac-facilitator@gmail.com"/>
							<input type="hidden" name="return" value="http://localhost:8000/success"/>
							<input type="hidden" name="currency_code" value="EUR"/>
							 <input type="hidden" name="quantity" value="1"/>
							<input type="hidden" name="item_name" value={"Trip from " + trip.from.name + " to " + trip.to.name} />
							<input type="hidden" name="item_number" value={trip.id}/>
							<input type="hidden" name="amount" value={trip.price} />
							<input type="hidden" name="hosted_button_id" value="PUXW2HB25RFP2"/>
							<input type="image" src="../img/paypal_please.png" border="0" width="110px" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
							<img alt="" border="0" src="../img/paypal_please.png" width="1" height="1"/>
						</React.Bootstrap.Form>
					</td>
				</tr>
		})
		return <React.Bootstrap.Table className="search_trips_results" hover={true} striped={true} condensed={true}>
			<thead>
				<tr>
					<th>Train</th>
					<th>From</th>
					<th>To</th>
					<th>Departure Time</th>
					<th>Total Travel Time (approx.)</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{trips}
			</tbody>
		</React.Bootstrap.Table>
	},

	render: function(){

		var stations = this.state.stations.map(function(station){
			return <option key={station.id} value={station.id}>{station.name}</option>
		});

		return <div>
			<div className="col-md-4" style = {{textAlign: ""}}>
				<div role="panel" className="panel panel-default">
					<div className="panel-heading">Search a ticket</div>
					<div className="panel-body">
						<form className="search_trips_form" style={{fontSize: '.8em'}}>

							<React.Bootstrap.FormGroup controlId="date" bsSize="small" className="">
								<React.Bootstrap.ControlLabel>Departure Date</React.Bootstrap.ControlLabel>
								<DateTimePicker id="date" mode="date"  />
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup controlId="time" bsSize="small" className="col-md-6">
								<React.Bootstrap.ControlLabel>Between</React.Bootstrap.ControlLabel>
								<DateTimePicker id="time" mode="time"  />
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup controlId="time" bsSize="small" className="col-md-6">
								<React.Bootstrap.ControlLabel>And</React.Bootstrap.ControlLabel>
								<DateTimePicker id="time" mode="time"  />
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup bsSize="small" className="">
								<React.Bootstrap.ControlLabel for="departure">Departure Station</React.Bootstrap.ControlLabel>
								<React.Bootstrap.FormControl componentClass="select">
									{stations}
								</React.Bootstrap.FormControl>
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup bsSize="small" className="">
								<React.Bootstrap.ControlLabel for="arrival">Arrival Station</React.Bootstrap.ControlLabel>
								<React.Bootstrap.FormControl componentClass="select">
									{stations}
								</React.Bootstrap.FormControl>
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.Button onClick={this.searchTrips} type="button" bsStyle="default">Search</React.Bootstrap.Button>
						</form>
					</div>
				</div>
			</div>
			<div className="col-md-8">
				<div role="panel" className="panel panel-default">
					<div className="panel-heading">Available Trips</div>
					<div className="panel-body">
						{this.results()}
					</div>
				</div>
			</div>
		</div>
	}
})
