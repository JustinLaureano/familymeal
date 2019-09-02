import React from 'react';

export class TableOption extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
			confirmationOpen: false,
        };
    };

    toggleConfirmation = () => this.setState({ confirmationOpen: !this.state.confirmationOpen });
    
	render() {
        const option = this.props.option;
        const id = this.props.id;
        const confirmation = this.props.hasOwnProperty('confirmation') && this.props.confirmation;
        return (
            <div
                key={"option_" + option.label + "_" + id}
                onClick={ confirmation ? this.toggleConfirmation : this.props.onClick }
                className="table__more-option">
                <i className="material-icons table__more-option-icon">{ option.icon }</i>
                { option.conditional ? option.conditional : option.label }

                {
                    confirmation &&
                    this.state.confirmationOpen && 
                    <div className="table__more-option-confirmation confirmation">
                        <p className="confirmation__label">{ this.props.confirmationMessage }</p>
                        <button
                            id={ "remove-btn_" + id }
                            className="btn--confirmation-confirm"
                            onClick={ this.props.onClick }>
                            Remove
                        </button>
                        <button
                            id={ "confirmation-cancel-btn_" + id }
                            className="btn--confirmation"
                            onClick={ this.toggleConfirmation }>
                            Cancel
                        </button>
                    </div>
                }

            </div>
        )
	}
}

export default TableOption;