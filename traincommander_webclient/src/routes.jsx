var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRedirect = ReactRouter.IndexRedirect;
var Main = require('./main');
var browserHistory = ReactRouter.browserHistory;

var SearchTicket = require('./search-ticket');
var OrderTrip = require('./order-trip');
var SuccessPayment = require('./success-payment');
var Login = require('./auth/login');
var Signup = require('./auth/signup');
var NotFound = require('./not-found');
var MyOrders = require('./auth/my-orders');

module.exports = (
	<Router  history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRedirect to="/search" />
			<Route path="/search" component={SearchTicket} />
			<Route path="/order" component={OrderTrip}/>
			<Route path="/success" component={SuccessPayment} />
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
			<Route path="/my-orders" component={MyOrders} />
			<Route path="/logout" />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
)