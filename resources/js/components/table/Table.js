import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Table extends React.Component {
	componentWillMount() {
		console.log(this.props.options);
		if (this.props.options) {
			this.props.headers.push({
				label: 'More', data: 'more_vert'
			});
		}
	}


	render() {
		return (
			<section className="table">
				<section className={this.props.className}>
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
										return (
											<p key={index}>{item[header.data]}</p>
										);
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