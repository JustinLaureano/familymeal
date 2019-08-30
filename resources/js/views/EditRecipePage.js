import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class EditRecipePage extends React.Component {
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'}
		];
		return (
			<section className="">
				<Breadcrumbs breadcrumbs={ breadcrumbProps } />
				<h1>Edit Recipe</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);