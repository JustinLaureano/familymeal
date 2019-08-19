import React from 'react';
import { history } from '../../routers/AppRouter';
import { connect } from 'react-redux';
import { setEditMode, setCancelChanges, resetCancelChanges } from '../../actions/filters';
import { createNewIngredient, deleteIngredient, updateIngredient } from '../../actions/ingredients';
import { setToastMessages } from '../../actions/toast';
import { ingredientDeleted } from '../../services/ToastMessages';
import { validateIngredient, getNewIngredient } from '../../services/Ingredient';

export class IngredientPageHeader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ingredient: this.props.currentIngredient
        };
    };

    cancelChanges = () => {
        this.setState(() => ({ ingredient: this.props.currentIngredient }));

        this.props.setCancelChanges()
            .then(() => this.toggleEditMode());
    }
    
    toggleEditMode = () => {
        const editMode = this.props.filters.editMode ? false : true;

        this.props.setEditMode(editMode);
    }
    
    setName = (e) => {
        const ingredient = {
            ...this.state.ingredient,
            name: e.target.value
        }
        this.setState(() => ({ ingredient }));
    }

    saveChanges = () => {

        if (this.props.ingredient_id) {
            this.props.resetCancelChanges();
            if (this.props.filters.cancelChanges) {
                this.props.resetCancelChanges();
            }

            const ingredient = {
                id: this.props.currentIngredient.id,
                ingredient_category_id: parseInt(document.querySelector('select[name="ingredient-category"]').value),
                ingredient_subcategory_id: this.props.currentIngredient.ingredient_subcategory_id,
                name: this.state.ingredient.name
            }

            // TODO validate and make sure the ingredient needs updating
            this.props.updateIngredient(ingredient);

            this.toggleEditMode();
        }
        else {
            // New ingredient
            const newIngredient = getNewIngredient(this.props.currentIngredient);
            const validation = validateIngredient(newIngredient);
            if (!validation.errors) {
                this.props.createNewIngredient(newIngredient);
            }
            else {
                this.props.setToastMessages(validation.errors);
            }
        }
    }

    startDeleteIngredient = () => {
        this.props.deleteIngredient(this.props.ingredient_id);

        const location = {
            pathname: '/home',
            state: {
                toast: {
                    message: ingredientDeleted()
                }
            }
        }
        history.push(location);
    }

    startEditMode = () => {
        if (this.props.filters.cancelChanges) {
            this.props.resetCancelChanges();
        }
        this.toggleEditMode();
    }

	render() {
        const name = this.state.ingredient && this.state.ingredient.name ? this.state.ingredient.name : '';
		return (
            <section className="page-header">
                <section className="page-header__info">
                    {
                        this.props.filters.editMode ? 
                        (
                            <input
                                type="text"
                                name="name"
                                className={
                                    "page-header__title--input" + (name != '' ? ' bold' : '')
                                }
                                onChange={ this.setName }
                                value={ name }
                                placeholder="Ingredient Name" />
                        ) :
                        (
                            <h1 className="page-header__title">
                                { this.props.name }
                            </h1>
                        )
                    }				
                </section>

                <section className="page-header__options">
                    { 
                        this.props.filters.editMode &&
                        <div className="btn--primary page-header__action-btn" onClick={ this.saveChanges }>
                            <i className="material-icons page-header__save-icon">done</i>
                            <span>Save</span>
                        </div>
                    }
                    { 
                        this.props.filters.editMode &&
                        <div className="btn page-header__action-btn" onClick={ this.cancelChanges }>
                            <i className="material-icons page-header__save-icon">cancel</i>
                            <span>Cancel</span>
                        </div>
                    }
                    {
                        !this.props.filters.editMode &&
                        <div>
                            <i className="material-icons page-header__more-icon">more_vert</i>
                            <div className="page-header__options-modal">
                                <div
                                    className="page-header__modal-option"
                                    onClick={ this.startEditMode }>
        
                                    <i className="material-icons page-header__modal-option-icon">edit</i>
                                    Edit Ingredient
                                </div>
                                <div
                                    className="page-header__modal-option"
                                    onClick={ this.startDeleteIngredient }>
        
                                    <i className="material-icons page-header__modal-option-icon">delete</i>
                                    Delete Ingredient
                                </div>
                            </div>
                        </div>
                    }
                </section>

            </section>
		);
	};
};
  
const mapStateToProps = (state) => ({
    ingredient_id: state.filters.currentIngredient.id,
    name: state.filters.currentIngredient.name,
    currentIngredient: state.filters.currentIngredient,
    filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
    setEditMode: (editMode) => dispatch(setEditMode(editMode)),
    createNewIngredient: (ingredient) => dispatch(createNewIngredient(ingredient)),
    updateIngredient: (ingredient) => dispatch(updateIngredient(ingredient)),
    setCancelChanges: () => dispatch(setCancelChanges()),
    resetCancelChanges: () => dispatch(resetCancelChanges()),
    deleteIngredient: (id) => dispatch(deleteIngredient(id)),
    setToastMessages: (messages) => dispatch(setToastMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientPageHeader);
