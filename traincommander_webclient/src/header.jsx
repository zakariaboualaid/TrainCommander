var React = require('react');
React.Bootstrap = require('react-bootstrap');
Navbar = React.Bootstrap.Navbar;
NavItem = require("react-bootstrap/lib/NavItem");
Nav = require("react-bootstrap/lib/Nav");

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
				<Nav pullRight>
					<NavItem active={this.activeLink("/signup")} eventKey={1} href="/signup">Sign up</NavItem>
					<NavItem active={this.activeLink("/login")} eventKey={2} href="/login">Login</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	}
});