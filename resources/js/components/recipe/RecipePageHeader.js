import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEditMode, setCancelChanges, resetCancelChanges } from '../../actions/filters';
import { updateRecipeName, favoriteRecipe } from '../../actions/recipes';

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
        this.props.resetCancelChanges();
        if (this.props.filters.cancelChanges) {
            this.props.resetCancelChanges();
        }
        this.toggleEditMode();
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
                                className="page-header__title--input"
                                onChange={ this.setName }
                                value={ this.state.name } />
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
    filters: state.filters,
    favorite: state.filters.currentRecipe.info.favorite
});

const mapDispatchToProps = (dispatch) => ({
    setEditMode: (editMode) => dispatch(setEditMode(editMode)),
    updateRecipeName: (name) => dispatch(updateRecipeName(name)),
    setCancelChanges: () => dispatch(setCancelChanges()),
    resetCancelChanges: () => dispatch(resetCancelChanges()),
    favoriteRecipe: (id, favorite) => dispatch(favoriteRecipe(id, favorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePageHeader);
