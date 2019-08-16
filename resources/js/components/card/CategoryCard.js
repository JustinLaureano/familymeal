import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CardView from '../table/CardView';

export class CategoryCard extends React.Component {
	render() {
        console.log(this.props);
        return (
            <section className="card__area">
                <div id={ "category_" + this.props.id } className="card">
                    <div className="card__header">
                        <h4>{ this.props.name }</h4>
                    </div>
                    <div>
                        <img
                            src={ '/images/recipe-categories/' + this.props.name + '.jpg' } 
                            className="card__photo"
                            alt={ this.props.name } />
                    </div>
                    <div className="card__footer">
                        <Link
                            to={{
                                pathname: "/home",
                                state: {
                                    recipe_category_id: this.props.id
                                }
                            }}>
                            { this.props.total } Recipes
                        </Link>
                    </div>
                </div>
            </section>
        )
	}
}

export default CategoryCard;