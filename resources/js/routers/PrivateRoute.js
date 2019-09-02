import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

export class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: this.props.sidebarOpen
		}
	}

	componentDidUpdate() {
		if (this.state.sidebarOpen !== this.props.sidebarOpen) {
			this.setState({ sidebarOpen: !this.state.sidebarOpen });
		}
	}
	render() {
		const {component: Component, ...rest} = this.props;
		return (
			<Route {...this.props} component={(props) => (
				<div className="app">
					<Header />
					<Navbar />
					<main className={ "main" + (this.state.sidebarOpen ? " sidebar--open" : " sidebar") }>
						<Component {...props} />
						<Footer />
					</main>
					<Toast {...props}/>
				</div>
			)} />
		)
	}
}

const mapStateToProps = (state) => ({
	  isAuthenticated: !!state.auth.token,
	  sidebarOpen: state.ui.sidebarOpen
});

export default connect(mapStateToProps)(PrivateRoute);
