import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  updateRecipeIngredients } from '../../actions/recipes';
import { addCurrentRecipeIngredient } from '../../actions/filters';
import { arrayMove } from '../../helpers/Recipe';
import IngredientSelect from '../recipe/IngredientSelect';

export class RecipeIngredients extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ingredients: this.props.ingredients,
        };
    };

    componentDidUpdate() {
		if (!this.props.editMode) {
			this.saveRecipeIngredients();
        }
        if (this.state.ingredients.length !== this.props.ingredients.length) {
            this.setState(() => ({ ingredients: this.props.ingredients }));
        }
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    }

    onDrag = (e, id) => {
        document.body.style.cursor = 'move';

        const dropPos = e.clientY;
        const ingredientList = document.querySelectorAll('.recipe-grid__ingredient-row--edit');
        let newIndex = null;

        // determine where to drop
        for (let i = 0; i < ingredientList.length; i++) {
            const top = ingredientList[i].getBoundingClientRect().top;
            const height = ingredientList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof ingredientList[i + 1] == 'undefined' ?
                bottom : ingredientList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
                break;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == ingredientList.length) {
                // last element
                newIndex = i;
            }
        }

        if (newIndex != null) {
            [...ingredientList].map((ingredient, index) => {
                if (index == newIndex) {
                    ingredient.style.marginTop = (ingredientList[newIndex].getBoundingClientRect().height * .15) + 'px';
                    ingredient.style.borderTop = '2px solid #505d6a';

                }
                else {
                    ingredient.style.marginTop = 0;
                    ingredient.style.borderTop = 'none';
                    ingredient.style.borderBottom = 'none';
                }

            });
        }
    }

    onDragEnd = (e) => {
        document.body.style.cursor = 'auto';
        const ingredientList = document.querySelectorAll('.recipe-grid__ingredient-row--edit');
        [...ingredientList].map(ingredient => {
            ingredient.style.marginTop = 0;
            ingredient.style.borderTop = 'none';
            ingredient.style.borderBottom = 'none';
        });
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e) => {
        const dropPos = e.clientY;
        const id = e.dataTransfer.getData('id');
        const ingredientList = document.querySelectorAll('.recipe-grid__ingredient-row--edit');
        let newIndex = null;

        // determine where to drop
        for (let i = 0; i < ingredientList.length; i++) {

            const top = ingredientList[i].getBoundingClientRect().top;
            const height = ingredientList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof ingredientList[i + 1] == 'undefined' ?
                bottom : ingredientList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == ingredientList.length) {
                // last element
                newIndex = i;
            }
        }

        if (newIndex != null) {
            let currentIndex = null;
            this.state.ingredients.map((ingredient, index) => {
                if (ingredient.id == id) {
                    currentIndex = index;
                }
            });

            this.setState(() => ({ ingredients: arrayMove(this.state.ingredients, currentIndex, newIndex) }));
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
    
    addIngredient = (ingredient) => {
        this.props.addCurrentRecipeIngredient({
            id: Math.floor(Math.random() * (999999 - 900000) + 900000),
            order: this.state.ingredients.length + 1,
            ingredient_id: ingredient.ingredient_id ? ingredient.ingredient_id : Math.floor(Math.random() * (999999 - 900000) + 900000),
            ingredient_name: ingredient.value,
            ingredient_recipe_id: null,
            ingredient_recipe_name: null,
            ingredient_units: ingredient.amount,
            measurement_unit: ingredient.measurement_unit
        });
    }

	render() {
        if (this.props.editMode) {
            return (
                <section className="recipe-grid__ingredients">
                    <h2 className="recipe-grid__section-title">Ingredients</h2>

                    <IngredientSelect addIngredient={ this.addIngredient } />

                    <section
                        className="recipe-grid__ingredient-list"
                        onDragOver={ this.onDragOver }>
                        { this.state.ingredients.map((ingredient, index) => {
                            return (
                                <div 
                                    key={"ingredient_" + ingredient.id}
                                    id={ "ingredient_" + ingredient.id }
                                    className="recipe-grid__ingredient-row--edit"
                                    draggable
                                    onDragStart={(e) => this.onDragStart(e, ingredient.id) }
                                    onDrag={ (e) => this.onDrag(e, ingredient.id) }
                                    onDragEnd={ this.onDragEnd }
                                    onDrop={ this.onDrop }>

                                    <i 
                                        className="material-icons drag-icon">drag_indicator</i>

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
                                                    pathname: "/ingredients/" + ingredient.ingredient_id,
                                                    state: {
                                                    id: ingredient.ingredient_id
                                                    }
                                                }}
                                                className="recipe-grid__ingredient-item">
                                                { ingredient.ingredient_name }
                                            </Link>
                                        ) : ingredient.ingredient_recipe_id ? 
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
                                        ) : (
                                            <p className="recipe-grid__ingredient-item">
                                                { ingredient.ingredient_name }
                                            </p>
                                        )
                                    }
                                    <i className="material-icons remove-icon">remove_circle</i>
                                </div>
                            )
                        })}
                    </section>
    
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
                                id={ "ingredient_" + ingredient.id }
                                className="recipe-grid__ingredient-row">
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
	addCurrentRecipeIngredient: (ingredient) => dispatch(addCurrentRecipeIngredient(ingredient)),
	updateRecipeIngredients: (ingredients) => dispatch(updateRecipeIngredients(ingredients)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeIngredients);
