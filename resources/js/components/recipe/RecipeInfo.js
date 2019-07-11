import React from 'react';
import { connect } from 'react-redux';
import RecipeCuisine from '../../components/recipe/RecipeCuisine';
import RecipeCategory from '../../components/recipe/RecipeCategory';

export class RecipeInfo extends React.Component {
	render() {
		return (
            <section className="recipe-grid__info">
				<RecipeCuisine />
				<RecipeCategory />
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
