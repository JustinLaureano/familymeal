import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

export class Table extends React.Component {
	componentWillMount() {
		if (this.props.options) {
			let hasMore = false;
			this.props.headers.map(header => {
				if (header.label == 'More') {
					hasMore = true;
				}
			});

			if (!hasMore) {
				this.props.headers.push({
					label: 'More', data: 'more_vert'
				});
			}
		}
	}

	render() {
		return (
			<section className="table">
				<TableHeader {...this.props} />
				<TableBody {...this.props} />
				<TableFooter {...this.props} />
			</section>
		)
	}
}

export default Table;