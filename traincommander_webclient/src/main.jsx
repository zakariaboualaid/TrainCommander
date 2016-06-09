var React = require("React");

module.exports = React.createClass({
	render: function() {
		return <div>
			<h1>Train Commander <small>v 1.0</small></h1>
			{this.props.children}
		</div>
	}
});