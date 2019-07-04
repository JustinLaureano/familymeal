import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export class Header extends React.Component {
	logout() {
		document.logoutform.submit();
	}
	
	render() {
		const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
		return (
			<header className="header">
				<a className="navbar-brand" href="/">
					Laravel
				</a>
				<button onClick={this.logout}>
					Logout
				</button>
				<form id="logout-form" className="header-form" name="logoutform" action="logout" method="POST">
					<input type="hidden" name="_token" value={csrfToken}/>
				</form>
    		</header>
		);
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	startLogout: () => dispatch(startLogout())
});
  
export default connect(undefined, mapDispatchToProps)(Header);
