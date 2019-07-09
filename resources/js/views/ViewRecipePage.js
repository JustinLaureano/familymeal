import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import { getRecipe } from '../actions/recipes';

export class ViewRecipePage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			recipe: this.props.recipe,
        };
	};

	componentDidMount () {
		const recipe_id = this.props.location.state.id;
		this.props.getRecipe(recipe_id);
	}
	
	render() {
		if (this.state.recipe == null) {
			return (
				<section className="">
					<Breadcrumbs />
					<h1>View Recipe</h1>
				</section>
			)
		}
		else {
			return (
				<section className="">
					<Breadcrumbs />
					<h1>View Recipe</h1>
					{this.state.recipe.info.name}
				</section>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		recipe: this.state.filters.currentRecipe
	}
};
  
const mapDispatchToProps = (dispatch, props) => ({
	getRecipe: (recipe_id) => dispatch(getRecipe(recipe_id))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipePage);