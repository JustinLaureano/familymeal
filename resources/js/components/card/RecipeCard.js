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
        const imgSrc = this.props.photo ? 
            '/recipe/photo/' + this.props.photo : 
            '/images/recipe-categories/' + this.props.recipe_category + '.jpg'

        return (
            <section className="card__area">
                <div id={ "recipe_" + this.props.id } className="card">
                    <div className="card__header">
                        <h4>{ this.props.name }</h4>
                    </div>
                    <div>
                        <img
                            src={ imgSrc } 
                            className="card__photo"
                            alt={ this.props.name } />
                    </div>
                    <div className="card__footer--recipe">
                        <section className="card__footer-details">
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
                        { this.props.options.map(option => {
                            switch(option.onClick) {
                                case 'favoriteRecipe':
                                    return (
                                        <div
                                            key={"option_" + option.label + "_" + item.id}
                                            onClick={ onClick }
                                            className="table__more-option">
                                            <i className="material-icons table__more-option-icon ">
                                                { option.icon }
                                            </i>
                                            { 
                                                this.props.model == 'favorite-recipes' ||
                                                item.favorite == 'true' ? 
                                                    'Remove Favorite' : 'Make Favorite'
                                            }
                                        </div>
                                    )
                            }
                        }) }
                        </section>
                    </div>
                </div>
            </section>
        )
	}
}

export default RecipeCard;