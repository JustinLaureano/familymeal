import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserDashboard } from '../actions/user';

export class DashboardPage extends React.Component {
	componentDidMount() {
		this.props.setUserDashboard();
	};

	render() {
		return (
		<div>
			<h1>Dashboard</h1>
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
    setUserDashboard: () => dispatch(setUserDashboard())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);