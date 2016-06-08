var React = require('react');
var Api = require('./utils/api')

module.exports = React.createClass({

	getInitialState: function() {
	    return {
	        trains: []  
	    };
	},

	componentWillMount: function() {
	      Api.getTrains().then(function(data){
	      	this.setState({
	      		trains: data
		})
	      }.bind(this))
	},

	render: function(){

		var list = this.state.trains.map(function(train){
			return <h2>{train.city}</h2>
		});

		return <div>
			<h1>Search tickets</h1>
			{list}
		</div>
	}
})
