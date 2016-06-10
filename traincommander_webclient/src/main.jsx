var React = require("React");
var SearchTicket = require('./search-ticket');
var Header = require('./header')

module.exports = React.createClass({

	componentDidMount: function() {
	},

	render: function() {
		return <div>
			<Header pathname={this.props.location.pathname} />
			<div className="container">{this.props.children}</div>
		</div>
	}
});