import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Header extends React.Component {
	render() {
		return (
			<header className="header">
    		</header>
		);
	};
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
