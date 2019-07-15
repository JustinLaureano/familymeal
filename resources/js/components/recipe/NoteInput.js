import React from 'react';
import { connect } from 'react-redux';

export class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: ''
        };
    }

    setNote = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    startAddNote = () => {
        if (this.isValidNoteEntry()) {
            this.props.addNote(this.state);
            this.setState(() => ({ note: '' }));
        }
        else {
            console.log('not valid');
            // TODO: message notifying of invalid entry
        }
    }
    
    isValidNoteEntry = () => {
        return this.state.note.trim() != '';
    }

	render() {
		return (
            <section className="recipe-grid__note-add">
                <textarea
                    type="text"
                    className="recipe-grid__note textarea--edit"
                    name="note"
                    value={ this.state.note }
                    placeholder="Add note"
                    onChange={ this.setNote } />

                <i
                    className="material-icons add-icon"
                    onClick={ this.startAddNote }>add_circle</i>
            </section>
		);
	};
};
  
export default NoteInput;
