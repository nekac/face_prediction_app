import React, {Component} from 'react';
import './register.css';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			registerEmail: '',
			registerPassword: '',
			registerName: ''
		}
	}

// collect email address from input field
	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

// collect password from input field
	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
	}

// collect name from input field
	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}

// when user wants to register, data is send to server, fetch method
	onSubmitRegister = () => {
		fetch('http://localhost:3001/register', { // second parameter is object that describe request
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ // need to be created so server can know what is received
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				name: this.state.registerName
			})
		}).then(response => response.json()).then(user => {
			if(user.id) {
				this.props.setUser(user); // get/load user that is currenly created
				this.props.onRouteChange('home');
			} else {
				this.props.onRouteChange('register');
				document.getElementById('wrong').style.display = "block";
			}
		});
	}

	render() {
		return (
		  <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-50-l shadow-5 mw6 center">
			<main className="pa4 black-80">
			  <div className="measure">
			  <p id="wrong" className="center w-60 ba br2 pa3 ma2 red bg-washed-red">
			  		<strong>ERROR!</strong>User with this email already exists or you leave some fields empty.
				</p>
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">REGISTER</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input onChange = {this.onNameChange} 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange = {this.onEmailChange} 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input  onChange = {this.onPasswordChange} 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick = {this.onSubmitRegister} // function is executed only when it is clicked
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" value="Register" />
			    </div>
			  </div>
			</main>
		  </article>
		);
	}
}

export default Register;