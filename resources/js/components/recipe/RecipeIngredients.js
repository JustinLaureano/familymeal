import React from 'react';
import { connect } from 'react-redux';

export class RecipeIngredients extends React.Component {
	render() {
		return (
            <section className="recipe-grid__ingredients">
                {this.props.ingredients.map(ingredient => {
                    return (
                        <p>{ ingredient.order }</p>
                    )
                })}
            </section>
		);
	};
};

const mapStateToProps = (state) => {
	return {
        recipeId: state.filters.currentRecipe.info.id,
        ingredients: state.filters.currentRecipe.ingredients
	}
};
  
export default connect(mapStateToProps)(RecipeIngredients);
