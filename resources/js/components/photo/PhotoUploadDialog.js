import React from 'react';
import { connect } from 'react-redux';
import { photoUploadProps } from '../../services/PhotoUpload';
import FileDrop from 'react-file-drop';

export class PhotoUploadDialog extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
           photo: this.props.photo,
           photoEdit: false,
           photoPreview: null
        };
    };

    clearPhotoPreview = () => {
        this.setState(() => ({ photoPreview: null }));
    }

    handleDrop = (files, event) => {
        console.log(files);
        console.log(event.target.result);
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState(() => ({
                photoPreview: {
                    file,
                    filename: event.target.result,
                    name: file.name
                }
            }));
        }
        reader.readAsDataURL(file);
    }

    saveRecipePhoto = () => {
        console.log('save');
    }
	
    render() {
        return (
            <div className="overlay--transparent">
                <section className="photo-upload">
                    <header className="photo-upload__header">
                        <i 
                            className="material-icons close-icon"
                            onClick={ this.props.closeDialog }>close</i>
                    </header>
                    <FileDrop
                        onDrop={ this.handleDrop }
                        { ...photoUploadProps } >
                        {
                            this.state.photoPreview ? (
                                <div className="photo-upload__preview">
                                    <h3 className="photo-upload__preview-subtitle">
                                        New Recipe Photo
                                    </h3>
                                    <img
                                        className="photo-upload__preview-thumbnail"
                                        src={ this.state.photoPreview.filename } />
                                    <figcaption className="photo-upload__preview-name">
                                        { this.state.photoPreview.name }
                                    </figcaption>

                                    <section className="photo-upload__btns">
                                        <button
                                            className="btn--primary"
                                            onClick={ this.clearPhotoPreview }>
                                            Clear
                                        </button>
                                        <button
                                            onClick={ this.saveRecipePhoto }
                                            className="btn--primary">
                                            Save
                                        </button>
                                    </section>

                                </div>
                            ) : (
                                <div className="photo-upload__placeholder">
                                    <i className="material-icons image-icon">image</i>
                                    <p className="photo-upload__instructions">
                                        Drag and drop recipe photo here.
                                    </p>
                                </div>
                            )
                        }
                    </FileDrop>
                </section>
            </div>
        );
    }

};

const mapStateToProps = (state) => ({
    photo: state.filters.currentRecipe.photo
});

const mapDispatchToProps = (dispatch, props) => ({

});
  
export default connect(mapStateToProps, mapDispatchToProps)(PhotoUploadDialog);
