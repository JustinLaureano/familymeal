import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeTablePage } from '../../actions/filters';

export class TableFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			page: 1,
			totalPages: 0
        };
    };

    componentDidUpdate() {
		if (this.state.totalPages == 0 && !isNaN(this.props.total)) {
			this.setState(() => ({ totalPages: Math.ceil(this.props.total / this.props.settings.table_result_limit) }));
		}
	}

    pageFilter = (e) => {
		const pageNumber = e.currentTarget.id.replace(/\D/g, '');
		this.props.changeTablePage(pageNumber, this.props.model);
		this.setState(() => ({ page: pageNumber }));
	}
    
    currentResults = () => {
		const filterLimit = this.props.settings.table_result_limit;
		let firstResult = this.state.page == 1 ?
			this.state.page : 
            (filterLimit * (this.state.page - 1)) + 1;
        let lastResult = filterLimit * this.state.page;

        // Special results for last page
        if (lastResult / filterLimit == this.state.totalPages) {
            firstResult = parseInt(this.props.total) - (this.props.total % filterLimit);
            lastResult = this.props.total;
        }

        // If no results loaded yet
		if (isNaN(filterLimit) || isNaN(firstResult) || isNaN(lastResult) || isNaN(this.props.total)) return 'No Results';

		return 'Showing Results ' + firstResult + '-' + lastResult  + ' of ' + this.props.total;
    }
    
	render() {
        let currentPage = parseInt(this.state.page);
        let pageCount = [];
        let paginationPos = 'start';
        if (currentPage <= 5) {
            let index = 1;
            while (pageCount.length < 5) {
                pageCount.push(index);
                index++;
            }
        }
        else if (currentPage >= this.state.totalPages - 5) {
            const p = this.state.totalPages;
            pageCount = [p - 4, p - 3, p - 2, p - 1, p];
            paginationPos = 'end';
        }
        else {
            const p = this.state.totalPages;
            pageCount = [p - 2, p - 1, p, p + 1, p + 2];
            paginationPos = 'middle';
        }
		return (
            <section className="table__footer">
                <section className="table__pagination">
                    <section className="table__current-results">
                        {this.currentResults()}
                    </section>
                    <section className="table__pagination-nav">
                        {
                            paginationPos == 'end' || paginationPos == 'middle' ?
                            (
                                <div>
                                    <button
                                        id={"page_1" }
                                        className={"btn--table" + (1 == currentPage ? '-active' : '')}
                                        onClick={this.pageFilter}>
                                        1
                                    </button>
                                    <span className="table__pagination-ellipsis">...</span>
                                    <button
                                        id={"page_" + (currentPage - 1)}
                                        className="btn--table"
                                        onClick={this.pageFilter}>
                                        Prev	
                                    </button>
                                </div>
                            ) : ''
                        }

                        {
                            pageCount.map((page) => {
                                return (
                                    <button
                                        key={"page_" + page}
                                        id={"page_" + page}
                                        className={"btn--table" + (page == currentPage ? '-active' : '')}
                                        onClick={this.pageFilter}>
                                        {page}
                                    </button>
                                )
                            })
                        }

                        {
                            paginationPos == 'start' || paginationPos == 'middle' ?
                            (
                                <div>
                                    <button
                                        id={"page_" + (currentPage + 1)}
                                        className="btn--table"
                                        onClick={this.pageFilter}>
                                        Next	
                                    </button>
                                    <span className="table__pagination-ellipsis">...</span>
                                    <button
                                        id={"page_" + this.state.totalPages}
                                        className={"btn--table" + (this.state.totalPages == currentPage ? '-active' : '')}
                                        onClick={this.pageFilter}>
                                        {this.state.totalPages}
                                    </button>
                                </div>
                            ) : ''
                        }
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
	changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(TableFooter);