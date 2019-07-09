import React from 'react';
import { connect } from 'react-redux';

export class RecipeInfo extends React.Component {
	render() {
		return (
            <section className="recipe-grid__info">
				<section className="recipe-grid__info-block">
					<h3>Cuisine</h3>
                	{this.props.info.cuisine_type}
				</section>

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
