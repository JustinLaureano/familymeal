import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

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
                                {this.props.subtitle.text}</h5>
                        ) : ''
                    }
                </section>
                {
                    this.props.options ?
                    (
                        <section className="page-header__options">
                            {
                                this.props.options.buttons ?
                                (
                                    this.props.options.buttons.map(button => {
                                        return (
                                            <Link to={ button.link }>
                                                <button className={ button.className }>
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
  
export default PageHeader;
