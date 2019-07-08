import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../../actions/recipes';

export class Table extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			page: 1,
			totalPages: 0
        };
	};

	componentWillMount() {
		if (this.props.options) {
			this.props.headers.push({
				label: 'More', data: 'more_vert'
			});
		}
	}

	componentDidUpdate() {
		if (this.state.totalPages == 0 && !isNaN(this.props.total)) {
			this.setState(() => ({ totalPages: Math.ceil(this.props.total / this.props.settings.table_result_limit) }));
		}
	}

	currentResults = () => {
		const filterLimit = this.props.settings.table_result_limit;
		let firstResult = this.state.page == 1 ? this.state.page : (filterLimit * page) + 1;
		let lastResult = filterLimit * this.state.page;
		if (isNaN(filterLimit) || isNaN(firstResult) || isNaN(lastResult) || isNaN(this.props.total)) return 'No Results';

		return 'Showing Results ' + this.state.page + '-' + lastResult  + ' of ' + this.props.total;
	}

	startDeleteRecipe = (e) => {
		const id = e.currentTarget.parentNode.id.replace(/\D/g, '');
		this.props.deleteRecipe(id);
	}

	render() {
		const pageCount = [...Array(this.state.totalPages)];
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
							<div
								key={item.id}
								className={this.props.className}>
							{
								this.props.headers.map((header, index) => {
									if (header.label == 'More') {
										return (
											<div key={index} className="table__more-options">
												<i className="material-icons table__more-icon">{header.data}</i>
												<div
													id={"options_" + item.id}
													className="table__options-modal">
													{this.props.options.map((option) => {
														if (typeof option.route != 'undefined') {
															return (
																<Link
																	key={"option_" + option.label + "_" + item.id}
																	to={option.route + item.id + option.action}
																	className="table__more-option">
																	<i className="material-icons table__more-option-icon">{option.icon}</i>
																	{option.label}
																</Link>
															)
														}
														else {
															switch(option.onClick) {
																case 'deleteRecipe':
																	return (
																		<div
																			key={"option_" + option.label + "_" + item.id}
																			onClick={this.startDeleteRecipe}
																			className="table__more-option">
																			<i className="material-icons table__more-option-icon">{option.icon}</i>
																			{option.label}
																		</div>
																	)
															}

														}
													})}
												</div>
											</div>
											);
										}
									else {
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

				<section className="table__footer">
					<section className="table__pagination">
						<section className="table__current-results">
							{this.currentResults()}
						</section>
						<section className="table__pagination-nav">
							{
								pageCount.map((page, index) => {
									if (index <= 5) {
										return (
											<button
												key={"page_" + index}
												className="btn--table">
												{index + 1}
											</button>
										)
									}
									else {
										return (
											<button
												key={"page_" + index}
												className="btn--table">
												{pageCount.length}
											</button>
										)
									}
								})
							}
						</section>
					</section>
				</section>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		settings: state.userSettings
	}
};
  
const mapDispatchToProps = (dispatch, props) => ({
	deleteRecipe: (id) => dispatch(deleteRecipe(id))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Table);