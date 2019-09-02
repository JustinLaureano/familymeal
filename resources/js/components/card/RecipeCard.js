import React from 'react';
import { Link } from 'react-router-dom';

export class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            footerOptionsOpen: false
        }
    }

    toggleMoreFooterOptions = () => this.setState({ footerOptionsOpen: !this.state.footerOptionsOpen });

	render() {
        return (
            <section className="card__area">
                <div id={ "recipe_" + this.props.id } className="card">
                    <div className="card__header">
                        <h4>{ this.props.name }</h4>
                    </div>
                    <div>
                        <img
                            src={ '/recipe/photo/' + this.props.photo } 
                            className="card__photo"
                            alt={ this.props.name } />
                    </div>
                    <div className="card__footer--recipe">
                        <section>
                            <p>
                                <span>Category</span> { this.props.recipe_category }
                            </p>
                            <p>
                                <span>Cuisine</span> { this.props.cuisine_type }
                            </p>
                        </section>
                        <section onClick={ this.toggleMoreFooterOptions }>
                            <i className="material-icons card__footer-more-icon">more_vert</i>
                        </section>

                        <section className={ "card__footer-dropdown" + (this.state.footerOptionsOpen ? '--open' : '') }>
                            dropdown
                        </section>
                    </div>
                </div>
            </section>
        )
	}
}

export default RecipeCard;