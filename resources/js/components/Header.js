import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export class Header extends React.Component {
	homeLink() {
		this.props.history.push('/');
	}

	logout() {
		document.logoutform.submit();
	}
	
	render() {
		const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
		return (
			<header className="header">
				<img 
					src="logos/rp_logo_color_400x100.png" 
					alt="Recipe Confidential"
					className="header__logo"
					onClick={this.homeLink} />
					
				<button
					className="btn--text"
					onClick={this.logout}>
					Logout
				</button>

				<form id="logout-form" className="header__form" name="logoutform" action="logout" method="POST">
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
