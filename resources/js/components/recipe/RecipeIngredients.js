import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRecipeIngredients } from '../../actions/recipes';
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
    }

    toggleGrabbingClass = (e) => {
        if (e.target.classList.contains('icon--grabbing')) {
            e.target.classList.remove('icon--grabbing');
        }
        else {
            e.target.classList.add('icon--grabbing');
        }
    }

    onDragStart = (e, id) => {
        console.log('dragstart: ' + id);
        e.dataTransfer.setData('id', id);
    }

    onDrag = (e) => {
        // console.log(e.clientY);

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
                if (index == newIndex + 1) {
                    ingredient.style.marginTop = ingredient.getBoundingClientRect().height + 'px';
                }
                else {
                    ingredient.style.marginTop = 0;
                }
            });
        }
    }

    onDragOver = (e) => {
        e.preventDefault();
        // console.log(e.clientY);
    }

    onDrop = (e) => {
        const dropPos = e.clientY;
        const id = e.dataTransfer.getData('id');
        const ingredientList = document.querySelectorAll('.recipe-grid__ingredient-row--edit');
        let newIndex = null;

        // determine where to drop
        for (let i = 0; i < ingredientList.length; i++) {
            ingredientList[i].style.marginTop = 0;

            const top = ingredientList[i].getBoundingClientRect().top;
            const height = ingredientList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof ingredientList[i + 1] == 'undefined' ?
                bottom : ingredientList[i + 1].getBoundingClientRect().bottom;

            console.log(dropPos, top, bottom, nextBottom);
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

	render() {
        if (this.props.editMode) {
            return (
                <section className="recipe-grid__ingredients">
                    <h2 className="recipe-grid__section-title">Ingredients</h2>

                    <IngredientSelect />
                    <section
                        className="recipe-grid__ingredient-list"
                        onDragOver={ this.onDragOver }>
                        {this.state.ingredients.map((ingredient, index) => {
                            return (
                                <div 
                                    key={"ingredient_" + ingredient.id}
                                    id={ "ingredient_" + ingredient.id }
                                    className="recipe-grid__ingredient-row--edit"
                                    draggable
                                    onDragStart={(e) => this.onDragStart(e, ingredient.id) }
                                    onDrag={ this.onDrag }
                                    onDrop={ this.onDrop }>

                                    <i 
                                        className="material-icons drag-icon"
                                        onMouseDown={ this.toggleGrabbingClass }
                                        onMouseUp={ this.toggleGrabbingClass }>drag_indicator</i>
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
	updateRecipeIngredients: (ingredients) => dispatch(updateRecipeIngredients(ingredients))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeIngredients);
