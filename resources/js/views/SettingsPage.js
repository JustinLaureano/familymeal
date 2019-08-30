import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class SettingsPage extends React.Component {
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'settings', path: '/settings'}
		];
		return (
			<section className="content">
				<Breadcrumbs breadcrumbs={ breadcrumbProps } />
				<h1>Settings</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);