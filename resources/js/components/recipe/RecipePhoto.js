import React from 'react';
import { connect } from 'react-redux';
import { updateRecipePhoto } from '../../actions/recipes';
import Photo from '../photo/Photo';
import PhotoUploadDialog from '../photo/PhotoUploadDialog';

export class RecipePhoto extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
           photo: this.props.photo,
           photoEdit: false
        };
    };

    componentDidUpdate() {
        if (this.state.photo && 
            this.props.photo && 
            this.state.photo.hasOwnProperty('filename') && 
            this.state.photo.filename !== this.props.photo.filename) 
        {
            this.setState(() => ({ photo: this.props.photo }));
        }
        
        if (this.state.photo && this.state.photo.hasOwnProperty('filename')) {
            document.getElementById('recipe_photo').src = this.getPhotoSource();
        }
        else if (this.props.photo) {
            document.getElementById('recipe_photo').src = this.getPhotoSource();
        }
    }

    getPhotoSource = () => {
        if (this.state.photo) {
            if (this.state.photo.filename.includes('data:image')) {
                return this.state.photo.filename;
            }
            else {
                return '/recipe/photo/' + this.state.photo.filename;
            }
        }
        else {
            return this.getRecipeCategoryPhoto();
        }
    }

    getRecipeCategoryPhoto = () => {
        const currentRecipeCategory = this.props.currentRecipe.info.recipe_category_name;
        let photo = 'All';
        this.props.recipeCategories.map(category => {
            if (currentRecipeCategory.toLowerCase() == category.name.toLowerCase()) {
                photo = currentRecipeCategory;
            }
        });
        return '/images/recipe-categories/' + photo + '.jpg';
    }
	
	setPhoto = (e) => {
        const photo = e.target.value;
        this.setState(() => ({ photo }));
    }

    saveRecipePhoto = (photo) => {
        this.props.updateRecipePhoto(photo);
        this.togglePhotoEditDialog();
    }

    saveNewRecipePhoto = (photo) => {
        this.setState({ photo });
        this.togglePhotoEditDialog();
    }
    
    togglePhotoEditDialog = () => {
        this.setState(() => ({
            photoEdit: this.state.photoEdit ? false : true
        }))
    }
	
	render() {
        const photoProps = {
            id: 'recipe_photo',
            className: 'photo--circle photo--recipe' + ( this.props.editMode ? '-edit' : ''),
            src: this.getPhotoSource()
        };

		if (this.props.editMode) {
			return (
                <section
                    className="recipe-grid__photo-edit">
                    <i
                        className="material-icons photo-edit-icon"
                        onClick={ this.togglePhotoEditDialog }>
                        edit
                    </i>
                    <Photo {...photoProps} />
                    
                    { 
                        this.state.photoEdit ? (
                            <PhotoUploadDialog
                                closeDialog={ this.togglePhotoEditDialog }
                                saveRecipePhoto={ this.saveRecipePhoto }
                                saveNewRecipePhoto={ this.saveNewRecipePhoto } />
                        ) : ''
                    }
                </section>
			);
		}
		else {
			return (
                <Photo {...photoProps}/>
			);
		}
	};
};

const mapStateToProps = (state) => ({
        editMode: state.filters.editMode,
        photo: state.filters.currentRecipe.photo,
        currentRecipe: state.filters.currentRecipe,
        recipeCategories: state.recipe_categories
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipePhoto: (photo) => dispatch(updateRecipePhoto(photo))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipePhoto);
