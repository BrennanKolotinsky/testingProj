import React, { Component } from "react";
const axios = require('axios');

class Authentication extends React.Component {

	constructor(props) {
    	super(props);

    	this.state = {
    		username: '',
    		password: '',
    	};
    }

    updateUserName(e) {
		this.state.username = e.target.value;
	}

	updatePassword(e) {
		this.state.password = e.target.value;
	}

	handleKeyPress(e) {
	  if(e.key === 'Enter'){
	    this.checkAuth();
	  }
	}

	checkAuth() {
		if (this.state.username === '' || this.state.password === '')
			alert("Incomplete login info!");

		axios(
			{
			  method: "POST", 
			  url: process.env.REACT_APP_LOCAL === 'true' ? "http://localhost:8080/authenticate" : "http://weatherbackend-env.eba-xftcnfcx.us-east-1.elasticbeanstalk.com/authenticate",
			  crossDomain: true, 
			  data: {
			  	username: this.state.username,
			  	password: this.state.password,
			  }
			}).then((response) => {

				if (response.data.auth === 1) {
					alert("Authenticated!");
					this.props.forceUpdate(1);
				} else {
					alert("Invalid username or password!");
				}
			}
		);
	}

    render() {

		return (
			<div className="marginAddedTop">
				<h2>Login Page!</h2>

				<input className="block inputs" type="text" placeholder="username" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updateUserName(event) }></input>
				<input className="block marginAddedLeft inputs" type="password" placeholder="password" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updatePassword(event) }></input>
				<button className="inputs confirmBtn" onClick={ () => this.checkAuth() }>Login</button>
			</div>
		);
	}

}

export default Authentication;