var React = require('react');
var Api = require('./utils/api')
React.Bootstrap = require('react-bootstrap');
var DateTimePicker = require('react-bootstrap-datetimepicker');
var moment = require('moment');
var Functions = require('./utils/functions');
var TripStore = require('./stores/trips-store');
var StationStore = require('./stores/stations-store');
var Reflux = require('reflux');
var Actions = require('./actions');
// React.Bootstrap.SelectRei = require('react-bootstrap-select');

module.exports = React.createClass({

	mixins: [
		Reflux.listenTo(TripStore, "onTripStoreChange"),
		Reflux.listenTo(StationStore, "onStationStoreChange")
	],

	getInitialState: function() {
		return {
			stations: [],
			trips: [],
			loading: false
		};
	},

	componentWillMount: function() {
		this.setState({loading: true});
		Actions.getAllTrips();
		Actions.getStations();
	},

	onTripStoreChange: function(event, trips) {
		this.setState({trips: trips});
		this.setState({loading: false});
	},

	onStationStoreChange: function(event, stations) {
		this.setState({stations: stations});
	},

	searchFromChanged: function() {
		var val = $("select#search_departure_station").val();
		$("select#search_arrival_station").selectedIndex = 0;
		$("select#search_arrival_station option").each(function(option){
			if(option == val) {
				$(this).attr("disabled", true);
			} else { $(this).attr("disabled", false); }
		})
	},

	searchTrips: function() {
		this.setState({loading: true});
		console.log("Searching trips : " + $("#search_trips_form").serialize());
		Actions.getTrips($("#search_trips_form").serialize());
	},

	startPaypalTransaction: function(){
		var token = Functions.generateToken();
		alert("cool")
	},

	results: function(){
		if(this.state.loading) return <h4>Loading...</h4>
		if(this.state.error != null) return <h4>{this.state.error}</h4>
		if(this.state.trips.length == 0)
			return <h4>No trips available for the moment.</h4>
		else
			return this.returnTripsTable()
	},

	returnTripsTable: function(){
		var trips = this.state.trips.map(function(trip){
			return <tr key={trip.id}>
					<td>{trip.train.name}</td>
					<td>{trip.from.name}</td>
					<td>{trip.to.name}</td>
					<td>{moment(trip.departure_time).format("ddd, D MMM YYYY | h:mm a")}</td>
					<td>{moment.duration(parseInt(trip.total_travel_time), "seconds").humanize()}</td>
					<td>
						<React.Bootstrap.Form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
							<input type="hidden" name="cmd" value="_xclick"/>
							<input type="hidden" name="business" value="boulaidzac-facilitator@gmail.com"/>
							<input type="hidden" name="return" value={"http://"+Functions.getHost()+"/success"} />
							<input type="hidden" name="currency_code" value="EUR"/>
							<input type="hidden" name="quantity" value="1"/>
							<input type="hidden" name="item_name" value={"Trip from " + trip.from.name + " to " + trip.to.name} />
							<input type="hidden" name="item_number" value={trip.id}/>
							<input type="hidden" name="amount" value={trip.price} />
							<input type="hidden" name="hosted_button_id" value="PUXW2HB25RFP2"/>
							<input type="image" name="submit" src="../img/paypal_please.png" border="0" width="110px" alt="PayPal - The safer, easier way to pay online!"/>
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
			<div className="col-md-4 search_ticket_panel" style = {{textAlign: ""}}>
				<div role="panel" className="panel panel-default">
					<div className="panel-heading">Search a ticket</div>
					<div className="panel-body">
						<form onChange={this.searchFromChanged} id="search_trips_form" className="search_trips_form" style={{fontSize: '.8em'}}>

							<React.Bootstrap.FormGroup controlId="date" bsSize="small" className="">
								<React.Bootstrap.ControlLabel>Departure Date</React.Bootstrap.ControlLabel>
								<DateTimePicker id="date" minDate={moment()} inputFormat="ddd, D MMM YYYY" inputProps={{name: "date"}} mode="date"  />
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup controlId="time" bsSize="small" className="col-md-6">
								<React.Bootstrap.ControlLabel>Between</React.Bootstrap.ControlLabel>
								<DateTimePicker class="time" inputFormat="hh:mm a" defaultText={moment().add(1, "hours").format("hh:00 a")} inputProps={{name: "between"}} mode="time"  />
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup controlId="time" bsSize="small" className="col-md-6">
								<React.Bootstrap.ControlLabel>And</React.Bootstrap.ControlLabel>
								<DateTimePicker class="time" inputFormat="hh:mm a" defaultText={moment().add(2, "hours").format("hh:00 a")} inputProps={{name: "and"}} mode="time"  />
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup bsSize="small" className="">
								<React.Bootstrap.ControlLabel for="departure">Departure Station</React.Bootstrap.ControlLabel>
								<React.Bootstrap.FormControl name="from" id="search_departure_station" onChange={this.stationChanged} componentClass="select">
									<option>Select a station</option>
									{stations}
								</React.Bootstrap.FormControl>
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.FormGroup bsSize="small" className="">
								<React.Bootstrap.ControlLabel for="arrival">Arrival Station</React.Bootstrap.ControlLabel>
								<React.Bootstrap.FormControl name="to" id="search_arrival_station" onChange={this.stationChanged} componentClass="select">
									<option selected disabled>Select a station</option>
									{stations}
								</React.Bootstrap.FormControl>
							</React.Bootstrap.FormGroup>

							<React.Bootstrap.Button onClick={this.searchTrips} type="button" bsStyle="success">Search</React.Bootstrap.Button>
						</form>
					</div>
				</div>
			</div>
			<div className="col-md-8 list_trips_panel">
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
