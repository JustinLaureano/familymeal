import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/Footer';

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
    <Route {...rest} component={(props) => (
		<div className="app">
			<Header />
			<Navbar />
			<main className="main sidebar">
				<Component {...props} />
			</main>
			<Footer />
		</div>
    )} />
);

const mapStateToProps = (state) => ({
  	isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
