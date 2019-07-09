import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageLoad from '../PageLoad';

export class RecipeIngredients extends React.Component {
	render() {
        return (
            <section className="recipe-grid__ingredients">
                <h2 className="recipe-grid__section-title">Ingredients</h2>

                {this.props.ingredients.map((ingredient, index) => {
                    return (
                        <div 
                            key={"ingredient_" + ingredient.id} 
                            className="recipe-grid__ingredient-row">
                            <p className="recipe-grid__ingredient-order">{ ingredient.order }.</p>
                            <p className="recipe-grid__ingredient-amount">
                                { parseFloat(ingredient.ingredient_units) }
                                &nbsp; &nbsp;
                                { ingredient.measurement_unit }
                            </p>
                            {
                                ingredient.ingredient_id ?
                                (
                                    <Link 
                                        to={ "ingredients/" + ingredient.ingredient_id + "/edit" }
                                        className="recipe-grid__ingredient-item">
                                        { ingredient.ingredient_name }
                                    </Link>
                                ) :
                                (
                                    <Link 
                                        to={ "recipes/" + ingredient.ingredient_recipe_id }
                                        className="recipe-grid__ingredient-item">
                                        { ingredient.ingredient_recipe_name }
                                    </Link>
                                )
                            }
                        </div>
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
