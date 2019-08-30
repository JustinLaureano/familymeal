import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class ImportExportPage extends React.Component {
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'import/export', path: '/import-export'},
		];
		return (
			<section className="content">
				<Breadcrumbs breadcrumbs={ breadcrumbProps } />
				<h1>Import / Export</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ImportExportPage);