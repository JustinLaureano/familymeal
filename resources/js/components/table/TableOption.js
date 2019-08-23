import React from 'react';

export class TableOption extends React.Component {
	render() {
        const option = this.props.option;
        const id = this.props.id;
        return (
            <div
                key={"option_" + option.label + "_" + id}
                onClick={ this.props.onClick }
                className="table__more-option">
                <i className="material-icons table__more-option-icon">{ option.icon }</i>
                { option.conditional ? option.conditional : option.label }
                <div></div>
            </div>
        )
	}
}

export default TableOption;