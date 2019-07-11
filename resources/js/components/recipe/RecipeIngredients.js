import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRecipeIngredients } from '../../actions/recipes';
import IngredientSelect from '../recipe/IngredientSelect';

export class RecipeIngredients extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ingredients: this.props.ingredients
        };
    };

    componentDidUpdate() {
		if (!this.props.editMode) {
			this.saveRecipeIngredients();
		}
    }

    setRecipeIngredients = () => {
        // TODO: get real ingredients
        const ingredients = this.state.ingredients;
        this.setState(() => ({ ingredients }));
    }
    
    saveRecipeIngredients = () => {
        const ingredients = this.state.ingredients;
        // TODO: match state ingredients to props ingredients to detect change
		if (ingredients[0].id != this.state.ingredients[0].id) {
			this.props.updateRecipeIngredients(ingredients);
		}
	}

	render() {
        if (this.props.editMode) {
            return (
                <section className="recipe-grid__ingredients">
                    <h2 className="recipe-grid__section-title">Ingredients Edit</h2>

                    <IngredientSelect />
    
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
                                            to={{
                                                pathname: "/ingredients/" + ingredient.ingredient_id + "/edit",
                                                state: {
                                                id: ingredient.ingredient_id
                                                }
                                            }}
                                            className="recipe-grid__ingredient-item">
                                            { ingredient.ingredient_name }
                                        </Link>
                                    ) :
                                    (
                                        <Link
                                            to={{
                                                pathname: "/recipes/" + ingredient.ingredient_recipe_id,
                                                state: {
                                                id: ingredient.ingredient_recipe_id
                                                }
                                            }}
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
        }
        else {
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
                                            to={{
                                                pathname: "/ingredients/" + ingredient.ingredient_id + "/edit",
                                                state: {
                                                id: ingredient.ingredient_id
                                                }
                                            }}
                                            className="recipe-grid__ingredient-item">
                                            { ingredient.ingredient_name }
                                        </Link>
                                    ) :
                                    (
                                        <Link
                                            to={{
                                                pathname: "/recipes/" + ingredient.ingredient_recipe_id,
                                                state: {
                                                id: ingredient.ingredient_recipe_id
                                                }
                                            }}
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
        }
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    recipeId: state.filters.currentRecipe.info.id,
    ingredients: state.filters.currentRecipe.ingredients
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeIngredients: (ingredients) => dispatch(updateRecipeIngredients(ingredients))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeIngredients);
