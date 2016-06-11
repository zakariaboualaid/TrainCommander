var React = require('react');
React.Bootstrap = require('react-bootstrap');
Navbar = React.Bootstrap.Navbar;
NavItem = require("react-bootstrap/lib/NavItem");
Nav = require("react-bootstrap/lib/Nav");
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

module.exports = React.createClass({

	getInitialState: function() {
	    return {
	          active: false
	    };
	},

	componentDidMount: function() {
	},

	activeLink: function(path){
		return (path === this.props.pathname) ? true : false
	},

	logout: function() {
		$.removeCookie('tc_token');
		$.removeCookie('tc_current_user_email');
		browserHistory.push('search');
	},

	navRight: function(){
		if($.cookie("tc_token") == null){
			return <Nav pullRight>
			<NavItem active={this.activeLink("/signup")} eventKey={1} href="/signup">Sign up</NavItem>
			<NavItem active={this.activeLink("/login")} eventKey={2} href="/login">Login</NavItem>
			</Nav>
		} else {
			email_user = $.cookie("tc_current_user_email")
			return <Nav pullRight>
			<NavItem><span>Welcome, {email_user}</span></NavItem>
			<NavItem href="/my-orders" active={this.activeLink("/my-orders")} eventKey={1}>My Orders</NavItem>
			<NavItem onClick={this.logout} eventKey={2}>Logout</NavItem></Nav>
		}
	},

	render: function() {
		return <Navbar staticTop={true} inverse={false}>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="#">Train Commander</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem active={this.activeLink("/search")} ref="home" eventKey={1} href="/">Home</NavItem>
				</Nav>
				
					{this.navRight()}
				
			</Navbar.Collapse>
		</Navbar>
	}
});