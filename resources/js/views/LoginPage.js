import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../actions/auth';

export class LoginPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
        };
	};
	
	onEmailChange = (e) => {
		const email = e.target.value
		this.setState(() => ({email}));
	};

	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({password}));
	};

	login = () => {
		const email = this.state.email;
		const password = this.state.password;

		this.props.startLogin(email, password);
	};

	render() {
		return (
			<div>
				<h1>Login Page</h1>
			
				<label>Email</label>
				<input
					className="input"
					type="text"
					value={this.state.email}
					onChange={this.onEmailChange} />
				<label>Password</label>
				<input
					className="input"
					type="password"
					value={this.state.password}
					onChange={this.onPasswordChange} />
				<button
					className="button button__action"
					type="button"
					onClick={this.login} >
					Login
				</button>
			</div>
		);
	};
}
  
const mapDispatchToProps = (dispatch, props) => ({
    startLogin: (email, password) => dispatch(startLogin(email, password))
});
  
export default connect(undefined, mapDispatchToProps)(LoginPage);