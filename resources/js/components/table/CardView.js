import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryCard from '../card/CategoryCard';

export class CardView extends React.Component {
	render() {
        if (this.props.cards.length > 0) {
            switch(this.props.type) {
                case 'category':
                    return (
                        <section className="cards">
                        {
                            this.props.cards.map((category, index) => {
                                return (
                                    <CategoryCard 
                                        key={ "category-card_" + index } 
                                        index={ index }
                                        total={ this.props.totals[index] ? this.props.totals[index].count : null }
                                        { ...category } />
                                )
                            })
                        }
                        </section>
                    )
            }

        }
        else {
            return (
                <h2>No Cards</h2>
            )
        }
	}
}

export default CardView;