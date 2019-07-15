import React from 'react';
import { connect } from 'react-redux';
import {  updateRecipeNotes } from '../../actions/recipes';
import { addCurrentRecipeNote, removeCurrentRecipeNote } from '../../actions/filters';
import { arrayMove } from '../../helpers/Recipe';
import NoteInput from '../recipe/NoteInput';

export class RecipeNotes extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            notes: this.props.notes,
            edited: false
        };

        this.newIdFloor = 900000;
        this.newIdCeiling = 999999;
    };

    addNote = (note) => {
        this.props.addCurrentRecipeNote({
            id: Math.floor(Math.random() * (this.newIdCeiling - this.newIdFloor) + this.newIdFloor),
            order: this.state.notes.length + 1,
            note: note.note
        });
        this.setState(() => ({ edited: true }));
    }

    componentDidUpdate() {
        if (!this.props.editMode) {
            this.saveRecipeNotes();
        }

        if (this.state.notes.length !== this.props.notes.length) {
            this.setState(() => ({ notes: this.props.notes }));
        }
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    }

    onDrag = (e, id) => {
        document.body.style.cursor = 'move';

        const dropPos = e.clientY;
        const noteList = document.querySelectorAll('.recipe-grid__note-row--edit');
        let newIndex = null;

        // determine where to drop
        for (let i = 0; i < noteList.length; i++) {
            const top = noteList[i].getBoundingClientRect().top;
            const height = noteList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof noteList[i + 1] == 'undefined' ?
                bottom : noteList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
                break;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == noteList.length) {
                // last element
                newIndex = i;
            }
        }

        if (newIndex != null) {
            [...noteList].map((note, index) => {
                if (index == newIndex) {
                    note.style.marginTop = (noteList[newIndex].getBoundingClientRect().height * .15) + 'px';
                    note.style.borderTop = '2px solid #505d6a';
                }
                else {
                    note.style.marginTop = 0;
                    note.style.borderTop = 'none';
                    note.style.borderBottom = 'none';
                }
            });
        }
    }

    onDragEnd = (e) => {
        document.body.style.cursor = 'auto';
        const noteList = document.querySelectorAll('.recipe-grid__note-row--edit');
        [...noteList].map(note => {
            note.style.marginTop = 0;
            note.style.borderTop = 'none';
            note.style.borderBottom = 'none';
        });
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e) => {
        const dropPos = e.clientY;
        const id = e.dataTransfer.getData('id');
        const noteList = document.querySelectorAll('.recipe-grid__note-row--edit');
        let newIndex = null;
        // determine where to drop
        for (let i = 0; i < noteList.length; i++) {

            const top = noteList[i].getBoundingClientRect().top;
            const height = noteList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof noteList[i + 1] == 'undefined' ?
                bottom : noteList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
                break;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == noteList.length) {
                // last element
                newIndex = i;
            }
        }
       
        if (newIndex != null) {
            let currentIndex = null;
            this.state.notes.map((note, index) => {
                if (note.id == id) {
                    currentIndex = index;
                }
            });

            this.setState(() => ({
                notes: arrayMove(this.state.notes, currentIndex, newIndex),
                edited: true 
            }));
        }

    }

    saveRecipeNotes = () => {
        if (this.state.edited) {
            this.setState(() => ({ edited: false }));
            this.props.updateRecipeNotes(this.state.notes);
        }
    }

    toggleNoteRemoveConfirm = (e) => {
        const removeContainer = document.getElementById('note-remove_' + e.target.id.replace(/\D/g, ''));
        if (removeContainer.classList.contains('display--none')) {
            removeContainer.classList.remove('display--none');
        }
        else {
            removeContainer.classList.add('display--none');
        }
    }

    removeNote = (e) => {
        const id = e.target.id.replace(/\D/g, '');
        const filteredNotes = this.state.notes.filter(note => note.id != id);
        this.props.removeCurrentRecipeNote(filteredNotes);
        this.setState(() => ({ edited: true }));
    }

	render() {
        if (this.props.editMode) {
            return (
                <section className="recipe-grid__notes">
                    <h2 className="recipe-grid__section-title">Notes</h2>

                    <NoteInput addNote={ this.addNote } />

                    <section
                        className="recipe-grid__note-list"
                        onDragOver={ this.onDragOver } >
                        {this.state.notes.map((note, index) => {
                            return (
                                <div 
                                    key={ "note_" + note.id }
                                    id={ "note_" + note.id }
                                    className="recipe-grid__note-row--edit"
                                    draggable
                                    onDragStart={(e) => this.onDragStart(e, note.id) }
                                    onDrag={ (e) => this.onDrag(e, note.id) }
                                    onDragEnd={ this.onDragEnd }
                                    onDrop={ this.onDrop }>

                                    <i className="material-icons drag-icon">drag_indicator</i>

                                    <p className="recipe-grid__note-order">
                                        { index + 1 }.
                                    </p>

                                    <p className="recipe-grid__note-note">
                                        { note.note }
                                    </p>

                                    <div className="recipe-grid__remove">
                                        <i
                                            id={ "remove-note_" + note.id }
                                            className="material-icons remove-icon"
                                            onClick={ this.toggleNoteRemoveConfirm }>remove_circle
                                        </i>
                                        <section
                                            id={ "note-remove_" + note.id }
                                            className="recipe-grid__confirmation confirmation display--none">
                                            <p className="confirmation__label">Remove Note?</p>
                                            <button
                                                id={ "remove-btn_" + note.id }
                                                className="btn--confirmation-confirm"
                                                onClick={ this.removeNote }>
                                                Remove
                                            </button>
                                            <button
                                                id={ "confirmation-cancel-btn_" + note.id }
                                                className="btn--confirmation"
                                                onClick={ this.toggleNoteRemoveConfirm }>
                                                Cancel
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            )
                        })}
                    </section>

                </section>
            )
        }
        else {
            return (
                <section className="recipe-grid__notes">
                    <h2 className="recipe-grid__section-title">Notes</h2>
                    {
                        this.props.notes.length > 0 ?
                        (
                            this.props.notes.map((note, index) => {
                                return (
                                    <div
                                        key={"note_" + index}
                                        className="recipe-grid__note-row">
                                        <p className="recipe-grid__note-order">{ note.order }.</p>
                                        <p className="recipe-grid__note">{ note.note }</p>
                                    </div>
                                )
                            })
                        ) :
                        (
                            <div
                                key={"note"}
                                className="recipe-grid__note-row">
                                <p className="recipe-grid__note--inactive">No notes for this recipe.</p>
                            </div>
                        )
                    }
                </section>
            );
        }
	};
};

const mapStateToProps = (state) => {
	return {
        editMode: state.filters.editMode,
        notes: state.filters.currentRecipe.notes
	}
};

const mapDispatchToProps = (dispatch, props) => ({
	addCurrentRecipeNote: (note) => dispatch(addCurrentRecipeNote(note)),
	removeCurrentRecipeNote: (notes) => dispatch(removeCurrentRecipeNote(notes)),
	updateRecipeNotes: (notes) => dispatch(updateRecipeNotes(notes)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeNotes);
