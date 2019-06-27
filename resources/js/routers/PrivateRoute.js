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
		isAuthenticated ? (
			<div className="site-container">
				<Header {...props} />
				<Sidebar {...props} />
				<Component {...props} />
				<Footer />
			</div>
		) : (
			<Redirect to="/" />
			)
    )} />
);

const mapStateToProps = (state) => ({
  	isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
