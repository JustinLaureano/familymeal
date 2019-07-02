import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { setUserDashboard } from '../actions/user';

export class DashboardPage extends React.Component {
	componentDidMount() {
		this.props.setUserDashboard();
		console.log(this.state);
	};

	render() {
		return (
		<div>
			<h1>Dashboard</h1>
			<Link to="/" onClick={this.props.startLogout}>Log Out</Link>
		</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
		recipe: state.recipes,
		user: state.user
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
	setUserDashboard: () => dispatch(setUserDashboard()),
	startLogout: () => dispatch(startLogout())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);