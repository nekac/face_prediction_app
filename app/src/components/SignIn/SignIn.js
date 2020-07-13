import React, {Component} from 'react';
import './signin.css';

class SignIn extends Component { 

	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

// collect email address from input field
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

// collect password from input field
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

// when user wants to sign in, data is send to server, fetch method
	onSubmitSignIn = () => {
		fetch('http://localhost:3001/signin', { // ajax call, second parameter is object that describes request
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ // need to be created so server can know what is received
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		}).then(response => response.json()).then(data => {
			if(data.id) { // good credentials for user to sign in
				this.props.setUser(data);
				this.props.onRouteChange('home');
			} else { // show error box
				document.getElementById('wrong').style.display = "block";
			}
		});
	}

	render() {
		const { onRouteChange } = this.props; // destructure properties that are received
		return (
		  <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-50-l shadow-5 mw6 center">
			<main className="pa4 black-80">
			  <div className="measure">
			 	<p id="wrong" className="center w-60 ba br2 pa3 ma2 red bg-washed-red">
			  		<strong>ERROR!</strong> Please enter correct email and password.
				</p>	
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">SIGN IN</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor = "email-address">Email</label>
			        <input onChange={this.onEmailChange} className = "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      onClick={this.onSubmitSignIn} // function is executed only when input button is clicked
			      type="submit" value="Sign in" />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => onRouteChange('register')} href="#0" className="f6 pointer link dim black db">Register</p>
			    </div>
			  </div>
			</main>
		  </article>
		);
	}
}

export default SignIn;