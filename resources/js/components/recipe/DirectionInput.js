import React from 'react';
import { connect } from 'react-redux';

export class DirectionInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            direction: ''
        };
    }

    setDirection = (e) => {
        const direction = e.target.value;
        this.setState(() => ({ direction }));
    }

    startAddDirection = () => {
        if (this.isValidDirectionEntry()) {
            this.props.addDirection(this.state);
            this.setState(() => ({ direction: '' }));
        }
        else {
            console.log('not valid');
            // TODO: message notifying of invalid entry
        }
    }
    
    isValidDirectionEntry = () => {
        return this.state.direction.trim() != '';
    }

	render() {
		return (
            <section className="recipe-grid__direction-add">
                <textarea
                    type="text"
                    className="recipe-grid__direction textarea--edit"
                    name="direction"
                    value={ this.state.direction }
                    placeholder="Add direction"
                    onChange={ this.setDirection } />

                <i
                    className="material-icons add-icon--textarea"
                    onClick={ this.startAddDirection }>add_circle</i>
            </section>
		);
	};
};
  
export default DirectionInput;
