var React = require('react');

module.exports = React.createClass({
	render: function() {
		return <div className="form">
			<form className="register-form">
				<input type="text" placeholder="name"/>
				<input type="password" placeholder="password"/>
				<input type="text" placeholder="email address"/>
				<button>create</button>
				<p className="message">Already registered? <a href="/login">Sign In</a></p>
			</form>
		</div>
	}
});