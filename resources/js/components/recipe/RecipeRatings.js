import React from 'react';
import { connect } from 'react-redux';
import { getAverageRating } from '../../helpers/Recipe';

export class RecipeRatings extends React.Component {
    getStarIcons = () => {
        const average = this.props.ratings.average;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= average) {
                stars.push('star');
            }
            else if (i > average && Math.floor(average) == (i - 1)) {
                stars.push('star_half');
            }
            else {
                stars.push('star_border');
            }
        }
        return stars;
    }

	render() {
        const stars = this.getStarIcons();
        return (
            <section className="recipe-grid__ratings">
                <section
                    className="recipe-grid__stars">
                    { stars.map((star, index) => {
                        return (
                            <i key={"star_" + index} className="material-icons star-icon">{ star }</i>
                        )
                    }) }
                </section>
                <h5 className="recipe-grid__rating-count">
                    { this.props.ratings.total + (this.props.ratings.total == 1 ? " Rating" : " Ratings") }
                </h5>
            </section>
        );
	};
};

const mapStateToProps = (state) => {
	return {
        recipeId: state.filters.currentRecipe.info.id,
        ratings: {
            average: getAverageRating(state.filters.currentRecipe.ratings),
            total: state.filters.currentRecipe.ratings.length
        }
	}
};
  
export default connect(mapStateToProps)(RecipeRatings);
