import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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