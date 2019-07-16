import React from 'react';
import { connect } from 'react-redux';
import RecipeCuisine from '../../components/recipe/RecipeCuisine';
import RecipeDifficulty from '../../components/recipe/RecipeDifficulty';
import RecipeCategory from '../../components/recipe/RecipeCategory';
import RecipeCookTime from '../../components/recipe/RecipeCookTime';
import RecipePortions from '../../components/recipe/RecipePortions';
import RecipePrepTime from '../../components/recipe/RecipePrepTime';

export class RecipeInfo extends React.Component {
	render() {
		return (
            <section className="recipe-grid__info">
				<RecipeDifficulty />
				<RecipePortions />
				<RecipePrepTime />
				<RecipeCookTime />
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
