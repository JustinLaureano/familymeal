import React from 'react';

export class TableCell extends React.Component {
	render() {
        return (
            <p
                key={ this.props.index }
                className={ this.props.class }>
                { this.props.data }
            </p>
        )
	}
}

export default TableCell;