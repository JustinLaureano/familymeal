import React from 'react';

export class TableHeader extends React.Component {
	render() {
		return (
            <section className={this.props.className + " table__header"}>
                {this.props.headers.map((header, index) => {
                    return (
                        <div key={index} className="table__cell">
                            <h4>{header.label}</h4>
                        </div>
                    );
                })}
            </section>
        )
	}
}

export default TableHeader;