import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
    <Route {...rest} component={(props) => (
		<div className="site-container">
			<Component {...props} />
		</div>
    )} />
);

const mapStateToProps = (state) => ({
  	isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
