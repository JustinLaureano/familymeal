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

	// componentDidUpdate() {
	// 	if (!this.props.editMode) {
	// 		this.saveRecipePhoto();
	// 	}
	// }
	
	setPhoto = (e) => {
        const photo = e.target.value;
        this.setState(() => ({ photo }));
    }

    saveRecipePhoto = (photo) => {
        console.log(this.props.photo);
        console.log(photo);
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
            className: 'photo--circle photo--recipe' + ( this.props.editMode ? '-edit' : ''),
            src: 'https://www.fillmurray.com/120/120'
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
