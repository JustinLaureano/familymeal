import React from 'react';
import { connect } from 'react-redux';
import { getAverageRating } from '../../helpers/Recipe';

export class RecipeInfo extends React.Component {
	render() {
		return (
            <section className="recipe-grid__info">
                {this.props.info.recipe_category_id}
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
