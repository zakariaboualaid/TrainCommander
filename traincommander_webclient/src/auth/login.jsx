var React = require('react');
var swal = require('sweetalert');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;

module.exports = React.createClass({

	authenticate: function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/authenticate?"+$("form.login-form").serialize(),
			success: function(data) {
				console.log("success !")
				console.log(data)
				$.cookie("tc_token", data.auth_token)
				$.cookie("tc_current_user_email", data.email)
				browserHistory.push('/');
			},
			error: function(data) {
				swal("Oops...", "Invalid email or password!", "error");
			}
		})
	},

	render: function() {
		return <div className="form">
			<form className="login-form">
				<input type="email" placeholder="email" name="email"/>
				<input type="password" placeholder="password" name="password"/>
				<button onClick={this.authenticate} >login</button>
				<p className="message">Not registered? <a href="/signup">Create an account</a></p>
			 </form>
		 </div>
	}
});