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
		if (isNaN(filterLimit) || isNaN(firstResult) || isNaN(lastResult) || isNaN(this.props.total)) return 'No Results';

		return 'Showing Results ' + firstResult + '-' + lastResult  + ' of ' + this.props.total;
    }
    
	render() {
        const pageCount = [...Array(this.state.totalPages)];
		return (
            <section className="table__footer">
                <section className="table__pagination">
                    <section className="table__current-results">
                        {this.currentResults()}
                    </section>
                    <section className="table__pagination-nav">
                        {
                            pageCount.map((page, index) => {
                                if (index < 5) {
                                    return (
                                        <button
                                            key={"page_" + (index + 1)}
                                            id={"page_" + (index + 1)}
                                            className={"btn--table" + ((index + 1) == this.state.page ? '-active' : '')}
                                            onClick={this.pageFilter}>
                                            {index + 1}
                                        </button>
                                    )
                                }
                                else if (index + 1 == pageCount.length) {
                                    return (
                                        <section key={"page-last"} className="table__pagination-last">
                                            <button
                                                id={"page_" + (this.state.page + 1)}
                                                className="btn--table"
                                                onClick={this.pageFilter}>
                                                Next	
                                            </button>
                                            <span className="table__pagination-ellipsis">...</span>
                                            <button
                                                id={"page_" + (index + 1)}
                                                className="btn--table"
                                                onClick={this.pageFilter}>
                                                {index + 1}
                                            </button>
                                        </section>
                                    )
                                }
                            })
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