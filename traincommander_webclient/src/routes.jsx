var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Main = require('./main');
var browserHistory = ReactRouter.browserHistory;

var SearchTicket = require('./search-ticket');
var ListTrips = require('./list-trips');
var OrderTrip = require('./order-trip');

module.exports = (
	<Router  history={browserHistory}>
		<Route path="/" component={Main}>
			<Route path="trips" component={ListTrips} />
			<Route path="order" component={OrderTrip}/>
		</Route>
	</Router>
)