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
            ingredient: this.props.ingredient
        };
    };

    cancelChanges = () => {
        this.setState(() => ({ ingredient: this.props.ingredient }));

        this.props.setCancelChanges()
            .then(() => this.toggleEditMode());
    }

    componentDidUpdate() {
		if (!this.props.filters.editMode && !this.props.filters.cancelChanges) {
			this.startSave();
		}
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

    startFavoriteIngredient = () => {
        this.props.favoriteIngredient(this.props.ingredient_id, this.props.favorite);
    }

    startSave = () => {
        const ingredient = this.state.ingredient;
        this.props.updateIngredient(ingredient);
    }

	render() {
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
                                    "page-header__title--input" + (this.state.name != '' ? ' bold' : '')
                                }
                                onChange={ this.setName }
                                value={ this.state.name }
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
    ingredient_id: state.filters.currentIngredient.info.id,
    name: state.filters.currentIngredient.info.name,
    currentIngredient: state.filters.currentIngredient,
    filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
    setEditMode: (editMode) => dispatch(setEditMode(editMode)),
    createNewIngredient: (ingredient) => dispatch(createNewIngredient(ingredient)),
    updateIngredientName: (name) => dispatch(updateIngredientName(name)),
    setCancelChanges: () => dispatch(setCancelChanges()),
    resetCancelChanges: () => dispatch(resetCancelChanges()),
    deleteIngredient: (id) => dispatch(deleteIngredient(id)),
    setToastMessages: (messages) => dispatch(setToastMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientPageHeader);
