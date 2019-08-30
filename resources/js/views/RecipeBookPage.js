import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class RecipeBookPage extends React.Component {
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'recipe book', path: '/recipe-book'}
		];
		return (
			<section className="content">
				<Breadcrumbs Breadcrumbs={ breadcrumbProps } />
				<h1>Recipe Book</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => ({

});
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeBookPage);