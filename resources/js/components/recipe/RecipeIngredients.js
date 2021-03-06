import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  updateRecipeIngredients } from '../../actions/recipes';
import { addCurrentRecipeIngredient, removeCurrentRecipeIngredient } from '../../actions/filters';
import { arrayMove } from '../../services/Recipe';
import IngredientSelect from '../recipe/IngredientSelect';

export class RecipeIngredients extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ingredients: this.props.ingredients,
            edited: false
        };

        this.newIdFloor = 900000;
        this.newIdCeiling = 999999;
    };

    componentWillUpdate() {
        if (this.props.cancelChanges) {
            for (let i = 0; i < this.state.ingredients.length; i++) {
                if (this.state.ingredients[i].id !== this.props.ingredients[i].id) {
                    this.setState(() => ({ ingredients: this.props.ingredients }));
                    break;
                }
            }
        }
    }

    componentDidUpdate() {
        if (!this.props.editMode && !this.props.cancelChanges) {
            this.saveRecipeIngredients();
        }

        if (this.state.ingredients.length !== this.props.ingredients.length) {
            this.setState(() => ({ ingredients: this.props.ingredients }));
        }

    }

    onDragStart = (e, id) => e.dataTransfer.setData('id', id);

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

    onDragOver = (e) => e.preventDefault();

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

            this.setState(() => ({
                ingredients: arrayMove(this.state.ingredients, currentIndex, newIndex),
                edited: true 
            }));
        }

    }
    
    saveRecipeIngredients = () => {
        if (this.state.edited) {
            this.setState(() => ({ edited: false }));
            this.props.updateRecipeIngredients(this.state.ingredients);
        }
    }
    
    addIngredient = (ingredient) => {
        console.log(ingredient);
        this.props.addCurrentRecipeIngredient({
            id: Math.floor(Math.random() * (this.newIdCeiling - this.newIdFloor) + this.newIdFloor),
            order: this.state.ingredients.length + 1,
            ingredient_id: ingredient.ingredient_id > 0 ? ingredient.ingredient_id : ingredient.recipe_id > 0 ? null : this.newRandomID(),
            ingredient_name: ingredient.recipe_id > 0 ? null : ingredient.value,
            ingredient_recipe_id: ingredient.recipe_id > 0 ? ingredient.recipe_id : null,
            ingredient_recipe_name: ingredient.recipe_id > 0 ? ingredient.value : null,
            ingredient_units: ingredient.amount,
            measurement_unit_id: ingredient.measurement_unit_id
        });
        this.setState(() => ({ edited: true }));
    }

    newRandomID = () => Math.floor(Math.random() * (999999 - 900000) + 900000);

    toggleIngredientRemoveConfirm = (e) => {
        const removeContainer = document.getElementById('ingredient-remove_' + e.target.id.replace(/\D/g, ''));
        if (removeContainer.classList.contains('display--none')) {
            removeContainer.classList.remove('display--none');
        }
        else {
            removeContainer.classList.add('display--none');
        }
    }

    removeIngredient = (e) => {
        const id = e.target.id.replace(/\D/g, '');
        const filteredIngredients = this.state.ingredients.filter(ingredient => ingredient.id != id);
        this.props.removeCurrentRecipeIngredient(filteredIngredients);
        this.setState(() => ({ edited: true }));
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
                        { 
                            this.state.ingredients.length === 0 &&
                            <div className="recipe-grid__ingredient-row--empty">
                                No ingredients
                            </div>
                        }
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

                                    <i className="material-icons drag-icon">drag_indicator</i>

                                    <p className="recipe-grid__ingredient-amount">
                                        { ingredient.ingredient_units.toString().replace(/(?:(\.\d*?[1-9]+)|\.)0*$/g, '$1') }
                                        &nbsp; &nbsp; &nbsp;
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
                                                <span className="recipe-grid__ingredient-item-type">(R) </span>
                                                { ingredient.ingredient_recipe_name }
                                            </Link>
                                        ) : (
                                            <p className="recipe-grid__ingredient-item">
                                                { ingredient.ingredient_name }
                                            </p>
                                        )
                                    }
                                    <div className="recipe-grid__remove">
                                        <i
                                            id={ "remove_" + ingredient.id }
                                            className="material-icons remove-icon"
                                            onClick={ this.toggleIngredientRemoveConfirm }>remove_circle
                                        </i>
                                        <section
                                            id={ "ingredient-remove_" + ingredient.id }
                                            className="recipe-grid__confirmation confirmation display--none">
                                            <p className="confirmation__label">Remove Ingredient?</p>
                                            <button
                                                id={ "remove-btn_" + ingredient.id }
                                                className="btn--confirmation-confirm"
                                                onClick={ this.removeIngredient }>
                                                Remove
                                            </button>
                                            <button
                                                id={ "confirmation-cancel-btn_" + ingredient.id }
                                                className="btn--confirmation"
                                                onClick={ this.toggleIngredientRemoveConfirm }>
                                                Cancel
                                            </button>
                                        </section>
                                    </div>
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

                    { 
                        this.props.ingredients.length === 0 &&
                        <div className="recipe-grid__ingredient-row--empty">
                            No ingredients
                        </div>
                    }

                    {this.props.ingredients.map((ingredient) => {
                        return (
                            <div 
                                key={"ingredient_" + ingredient.id} 
                                id={ "ingredient_" + ingredient.id }
                                className="recipe-grid__ingredient-row">
                                <p className="recipe-grid__ingredient-amount">
                                    { ingredient.ingredient_units.toString().replace(/(?:(\.\d*?[1-9]+)|\.)0*$/g, '$1') }
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
                                            <span className="recipe-grid__ingredient-item-type">(R) </span>
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
    cancelChanges: state.filters.cancelChanges,
    ingredients: state.filters.currentRecipe.ingredients
});

const mapDispatchToProps = (dispatch, props) => ({
	addCurrentRecipeIngredient: (ingredient) => dispatch(addCurrentRecipeIngredient(ingredient)),
	removeCurrentRecipeIngredient: (ingredient) => dispatch(removeCurrentRecipeIngredient(ingredient)),
	updateRecipeIngredients: (ingredients) => dispatch(updateRecipeIngredients(ingredients)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeIngredients);
