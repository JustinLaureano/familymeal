import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEditMode } from '../actions/filters';
import PageSearch from '../components/PageSearch';

export class PageHeader extends React.Component {
	render() {
		return (
            <section className="page-header">
                <section className="page-header__info">
                    <h1 className="page-header__title">{ this.props.title }</h1>			
                    {
                        this.props.subtitle ?
                        (
                            <h5 className={this.props.subtitle.className}>
                                {this.props.subtitle.text}
                            </h5>
                        ) : ''
                    }
                </section>
                {
                    this.props.options ?
                    (
                        <section className="page-header__options">
                            {
                                this.props.options.search &&
                                <PageSearch type={ this.props.options.search.type }/>
                            }
                            {
                                this.props.options.buttons ?
                                (
                                    this.props.options.buttons.map((button, index) => {
                                        return (
                                            <Link key={"button_" + index} to={ button.link }>
                                                <button className={ button.className + ' page-header__button' }>
                                                    <i className="material-icons btn__icon">{ button.icon }</i>
                                                    { button.label }
                                                </button>
                                            </Link>
                                        )
                                    })
                                ) : ''
                            }
                        </section>
                    ) : ''
                }
            </section>
		);
	};
};
  
const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setEditMode: (editMode) => dispatch(setEditMode(editMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
