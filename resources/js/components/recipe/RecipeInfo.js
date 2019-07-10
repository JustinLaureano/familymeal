import React from 'react';
import { connect } from 'react-redux';
import RecipeCuisine from '../../components/recipe/RecipeCuisine';

export class RecipeInfo extends React.Component {
	render() {
		return (
            <section className="recipe-grid__info">
				<RecipeCuisine />
				<section className="recipe-grid__info-block">
					<h3>Category</h3>
                	{this.props.info.recipe_category_name}
				</section>
            </section>
		);
	};
};

const mapStateToProps = (state) => {
	return {
        recipeId: state.filters.currentRecipe.info.id,
        info: state.filters.currentRecipe.info
	}
};
  
export default connect(mapStateToProps)(RecipeInfo);
