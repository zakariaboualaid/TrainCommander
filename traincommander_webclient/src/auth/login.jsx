var React = require('react');
var swal = require('sweetalert');
var Functions = require('../utils/functions');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;

module.exports = React.createClass({

	authenticate: function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "http://"+Functions.getHostname()+":3000/authenticate?"+$("form.login-form").serialize(),
			success: function(data) {
				console.log("success !")
				console.log(data)
				$.cookie("tc_token", data.auth_token)
				$.cookie("tc_current_user_email", data.email)
				$.cookie("tc_current_user_name", data.name)
				browserHistory.push('/');
			},
			error: function(data) {
				swal("Oops...", "Invalid email or password!", "error");
			}
		})
	},

	componentDidMount: function() {
		window.addEventListener('google-loaded',this.renderGoogleLoginButton);
	},

	// Facebook Setup
	
	testAPI: function() {
	  console.log('Welcome!  Fetching your information.... ');
	  FB.api('/me?fields=id,name,email', function(response) {
		  console.log(response);
		  console.log('Successful login for: ' + response.name);
		  console.log('Thanks for logging in, ' + response.name + '!');
		  this.registerFBUser(response.id, response.name, response.email)
	  }.bind(this));
	},

	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback: function(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	  // The response object is returned with a status field that lets the
	  // app know the current login status of the person.
	  // Full docs on the response object can be found in the documentation
	  // for FB.getLoginStatus().
	  if (response.status === 'connected') {
	    // Logged into your app and Facebook.
	    this.testAPI();
	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your app.
	    console.log('Please log into this app.');
	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this app or not.
	    console.log('Please log into Facebook.');

	  }
	},

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	checkLoginState: function() {
	  FB.getLoginStatus(function(response) {
	    this.statusChangeCallback(response);
	  }.bind(this));
	},

	handleClick: function() {
	  FB.login(function(res){
	  	if(res.authResponse){
	  		this.checkLoginState();
	  	}
	  }.bind(this), {scope: 'email,public_profile'});
	},

	registerFBUser: function(sub, name, email) {
		$.ajax({
			type: "POST",
			url: "http://"+Functions.getHostname()+":3000/registerguser",
			data: {
				sub: sub, name: name, email: email
			},
			success: function(data) {
				console.log(data)
				$.cookie("tc_token", data.auth_token)
				$.cookie("tc_current_user_email", data.email)
				$.cookie("tc_current_user_name", data.name)
				$.cookie("tc_current_auth", "fb")
				browserHistory.push('/');
			}
		})
	},

	// Google Setup

	responseGoogle: function(response) {
		console.log(response);
	},

	renderGoogleLoginButton: function(){
		function onSuccess(googleUser) {
			var id_token = googleUser.getAuthResponse().id_token;
			var email = googleUser.getBasicProfile().getEmail();
			var name = googleUser.getBasicProfile().getName();
			$.ajax({
				url: "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+id_token,
				method: "GET",
				success: function(data) {
					if(data.iss == "accounts.google.com"
						&& data.aud == Functions.getGoogleClientID()
						&& email == email) {
						registerGoogleUser(data.sub, name, email)
					} else {
						console.log("Something went wrong while verifying the integrity of the google user.")
					}
				}
			});
		}
		function onFailure(error) {
		  console.log(error);
		}
		function registerGoogleUser(sub, name, email) {
			$.ajax({
				type: "POST",
				url: "http://"+Functions.getHostname()+":3000/registerguser",
				data: {
					sub: sub, name: name, email: email
				},
				success: function(data) {
					console.log(data)
					$.cookie("tc_token", data.auth_token)
					$.cookie("tc_current_user_email", data.email)
					$.cookie("tc_current_user_name", data.name)
					$.cookie("tc_current_auth", "google")
					browserHistory.push('/');
				}
			})
		}
		gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 270,
			'height': 50,
			'longtitle': true,
			'theme': 'light',
			'onsuccess': onSuccess,
			'onfailure': onFailure
		});
	},

	render: function() {
		return <div className="form">
			<form className="login-form">
				<input type="email" placeholder="Email" name="email"/>
				<input type="password" placeholder="Password" name="password"/>
				<button onClick={this.authenticate}>login</button>
				<br/><br/>
				<div id="g-signin2"></div>
				<br/>
				 <div onClick={this.handleClick} className="fb_button">
				 	<div className="fb_icon" style={{padding: "15px", float: "left"}}>
				 		<img width="23" height="23" src="../../img/fb_icon.svg" />
				 	</div>
				 	<span className="fb_icon_content">
				 		Sign in with Facebook
				 	</span>
				 </div>
				<p className="message">Not registered? <a href="/signup">Create an account</a></p>
			</form>
		 </div>
	}
});