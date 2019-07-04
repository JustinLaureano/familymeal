import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getData } from '../actions/auth';
import { Header } from '../components/Header';

export class DashboardPage extends React.Component {
	componentDidMount() {
		// this.props.getData();
	};

	render() {
		return (
		<div>
			<Header />
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
	getData: () => dispatch(getData())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);