var React = require("React");
var SearchTicket = require('./search-ticket');
var Header = require('./header')

module.exports = React.createClass({

	componentDidMount: function() {
		// window.addEventListener('google-loaded',this.googleSignOut);

		window.fbAsyncInit = function() {
			FB.init({
				appId      : '743131102456956',
				xfbml      : true,
				cookie     : true,
				version    : 'v2.5'
			});
		};

		(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));  
	},



	render: function() {
		return <div>
			<Header pathname={this.props.location.pathname} />
			<div className="container">{this.props.children}</div>
		</div>
	}
});