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
        console.log(this.state.photo);
        console.log(this.props.photo);
        if (this.state.photo !== null) {
            document.getElementById('recipe_photo').src = '/recipe/photo/' + this.state.photo.filename;
        }
        else if (this.props.photo !== null) {
            document.getElementById('recipe_photo').src = '/recipe/photo/' + this.props.photo.filename;
        }
    }
	
	setPhoto = (e) => {
        const photo = e.target.value;
        this.setState(() => ({ photo }));
    }

    saveRecipePhoto = (photo) => {
        this.props.updateRecipePhoto(photo);
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
            src: ( this.state.photo !== null && this.state.photo.filename ) ? 
                '/recipe/photo/' + this.state.photo.filename :
                'https://www.fillmurray.com/120/120'
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
                                saveRecipePhoto={ this.saveRecipePhoto }/>
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
        photo: state.filters.currentRecipe.photo
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipePhoto: (photo) => dispatch(updateRecipePhoto(photo))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipePhoto);
