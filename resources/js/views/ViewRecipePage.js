import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import { getRecipe, clearCurrentRecipe } from '../actions/recipes';

export class ViewRecipePage extends React.Component {
	componentWillMount() {
		this.props.clearCurrentRecipe();
	}

	componentDidMount() {
		const recipe_id = this.props.location.state.id;
		this.props.getRecipe(recipe_id);
	}
	
	render() {
		if (this.props.recipe == null || this.props.recipe == 'undefined') {
			return (
				<PageLoad />
			)
		}
		else {
			const pageHeaderProps = {
				title: this.props.recipe.info.name,
				options: {
					buttons: [
						{
							link: 'recipes/'+ this.props.recipe.info.id +'/edit',
							className: 'btn--minimal',
							icon: 'edit',
							label: 'Edit Recipe'
						}
					]
				}
			}
			return (
				<section className="content">
					<Breadcrumbs />
					<PageHeader {...pageHeaderProps}/>
					<h1>{this.props.recipe.info.name}</h1>
					{this.props.recipe.info.name}
				</section>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		recipe: state.filters.currentRecipe
	}
};
  
const mapDispatchToProps = (dispatch, props) => ({
	clearCurrentRecipe: () => dispatch(clearCurrentRecipe()),
	getRecipe: (recipe_id) => dispatch(getRecipe(recipe_id))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipePage);