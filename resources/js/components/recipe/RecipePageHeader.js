import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../routers/AppRouter';
import { connect } from 'react-redux';
import { setEditMode, setCancelChanges, resetCancelChanges } from '../../actions/filters';
import { deleteRecipe, updateRecipeName, favoriteRecipe } from '../../actions/recipes';
import { setToastMessages } from '../../actions/toast';
import { recipeDeleted } from '../../services/ToastMessages';
import { validateRecipe, getNewRecipe } from '../../services/Recipe';

export class RecipePageHeader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.name
        };
    };

    cancelChanges = () => {
        this.setState(() => ({ name: this.props.name }));

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
        const name = e.target.value;
        this.setState(() => ({ name }));
    }

    saveChanges = () => {
        if (this.props.recipe_id) {
            this.props.resetCancelChanges();
            if (this.props.filters.cancelChanges) {
                this.props.resetCancelChanges();
            }
            this.toggleEditMode();
        }
        else {
            // New recipe
            const newRecipe = getNewRecipe(this.props.currentRecipe);
            const validation = validateRecipe(newRecipe);
            if (!validation.errors) {
                console.log('valid');
            }
            else {
                console.log('not valid', validation.errors, this.props, this.state);
                this.props.setToastMessages(validation.errors);
            }
        }
    }

    startDeleteRecipe = () => {
        this.props.deleteRecipe(this.props.recipe_id);

        const location = {
            pathname: '/home',
            state: {
                toast: {
                    message: recipeDeleted()
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

    startFavoriteRecipe = () => {
        this.props.favoriteRecipe(this.props.recipe_id, this.props.favorite);
    }

    startSave = () => {
        const name = this.state.name;

		if (name != this.props.name) {
			document.querySelector(".page-header__title").innerHTML = name;
			this.props.updateRecipeName(name);
		}
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
                                placeholder="Recipe Name" />
                        ) :
                        (
                            <h1 className="page-header__title">
                                { this.props.name }
                                {
                                    this.props.favorite == 'true' &&
                                    <i className="material-icons table-favorite-icon">favorite</i> 
                                }
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
                                    Edit Recipe
                                </div>
                                <div
                                    className="page-header__modal-option"
                                    onClick={ this.startFavoriteRecipe }>
        
                                    <i className="material-icons page-header__modal-option-icon">favorite</i>
                                    { this.props.favorite == 'true' ? 'Remove Favorite' : 'Make Favorite' }
                                </div>
                                <div
                                    className="page-header__modal-option"
                                    onClick={ this.startDeleteRecipe }>
        
                                    <i className="material-icons page-header__modal-option-icon">delete</i>
                                    Delete Recipe
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
    recipe_id: state.filters.currentRecipe.info.id,
    name: state.filters.currentRecipe.info.name,
    currentRecipe: state.filters.currentRecipe,
    filters: state.filters,
    favorite: state.filters.currentRecipe.info.favorite
});

const mapDispatchToProps = (dispatch) => ({
    setEditMode: (editMode) => dispatch(setEditMode(editMode)),
    updateRecipeName: (name) => dispatch(updateRecipeName(name)),
    setCancelChanges: () => dispatch(setCancelChanges()),
    resetCancelChanges: () => dispatch(resetCancelChanges()),
    favoriteRecipe: (id, favorite) => dispatch(favoriteRecipe(id, favorite)),
    deleteRecipe: (id) => dispatch(deleteRecipe(id)),
    setToastMessages: (messages) => dispatch(setToastMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePageHeader);
