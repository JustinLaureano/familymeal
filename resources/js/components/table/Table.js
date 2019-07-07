import React from 'react';
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Table extends React.Component {
	componentWillMount() {
		if (this.props.options) {
			this.props.headers.push({
				label: 'More', data: 'more_vert'
			});
		}
	}


	render() {
		return (
			<section className="table">
				<section className={this.props.className + " table__header"}>
					{this.props.headers.map((header, index) => {
						return (
							<div key={index} className="table__cell">
								<h4>{header.label}</h4>
							</div>
						);
					})}
				</section>

				<section className="table__body">
				{
					this.props.data.map((item, index) => {
						return (
							<div key={item.id} className={this.props.className}>
							{
								this.props.headers.map((header, index) => {
									if (header.label == 'More') {
										return (
											<i key={index} className="material-icons table__more-icon">{header.data}</i>
											);
										}
									else {
										console.log(this.props.headers[index]);
										if (this.props.headers[index].type == 'link') {
											return (
												<Link
													to={this.props.headers[index].route + item.id}
													key={index}
													className={this.props.headers[index].class}>
													{item[header.column]}
												</Link>
											);
										}
										else if (this.props.headers[index].type == 'date') {
											return (
												<p
													key={index}
													className={this.props.headers[index].class}>
													{item[header.column].replace(/\s?\d{2}:\d{2}:\d{2}/, '')}
												</p>
											);
										}
										else {
											return (
												<p
													key={index}
													className={this.props.headers[index].class}>
													{item[header.column]}
												</p>
											);
										}
									}
								})
							}
							</div>
						);
					})
				}
				</section>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(undefined, undefined)(Table);