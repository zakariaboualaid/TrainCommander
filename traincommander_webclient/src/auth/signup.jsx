var React = require('react');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;

module.exports = React.createClass({

	signup: function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/users/?"+$("form.register-form").serialize(),
			success: function(data) {
				console.log("success !")
				console.log(data)
				swal("Success!", "You can login and start using Train Commander!", "success");
				browserHistory.push('/login');
			},
			error: function(data) {
				console.log(data);
				errors = data.responseJSON;
				var errorsText = ""
				$.each(errors, function(field, msg){
					error = msg[0];
					errorsText += "<p>"+field+" "+error+"</p>";
				});
				swal({
					html: true,
					type: "error",
					title: "Error",
					text: errorsText
				});
			}
		})
	},

	render: function() {
		return <div className="form">
			<form className="register-form">
				<input type="text" name="user[name]" placeholder="Name"/>
				<input type="text" name="user[email]" placeholder="Email address"/>
				<input type="password" name="user[password]" placeholder="Password"/>
				<input type="password" name="user[password_confirmation]" placeholder="Confirm your password"/>
				<button onClick={this.signup}>Submit</button>
				<p className="message">Already registered? <a href="/login">Sign In</a></p>
			</form>
		</div>
	}
});