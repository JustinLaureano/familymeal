import React from 'react';
import { connect } from 'react-redux';
import { getAverageRating } from '../../helpers/Recipe';

export class RecipeRatings extends React.Component {
	render() {
		return (
            <section className="recipe-grid__ratings">
                <section>{this.props.ratings.average}</section>
                <section>{this.props.ratings.total}</section>
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
