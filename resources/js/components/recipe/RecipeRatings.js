import React from 'react';
import { connect } from 'react-redux';
import { getAverageRating, getUserRating } from '../../services/Recipe';
import { updateRecipeRating } from '../../actions/recipes';

export class RecipeRatings extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rating: this.props.ratings.user
        };
    };

    componentDidUpdate() {
		if (!this.props.editMode && !this.props.cancelChanges) {
			this.saveRatings();
		}
    }
    
    saveRatings = () => {
        const rating = this.state.rating.rating;

		if (typeof rating !== 'undefined' && parseInt(rating) != parseInt(this.props.ratings.user.rating)) {
			this.props.updateRecipeRating(rating);
		}
	}

    isHalfStar = (i, average) => {
        return i > average && Math.floor(average) != average && Math.floor(average) == (i - 1);
    }
    
    getStarIcons = () => {
        const average = this.props.editMode ?
            this.state.rating.rating : this.props.ratings.average;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= average) {
                stars.push('star');
            }
            else if (this.isHalfStar(i, average)) {
                stars.push('star_half');
            }
            else {
                stars.push('star_border');
            }
        }
        return stars;
    }

    setUserRating = (e) => {
        const star = e.target.id.replace(/\D/g, '');
        this.setState(() => ({ rating: { rating: star } }))
    }

	render() {
        const stars = this.getStarIcons();
        if (this.props.editMode) {
            return (
                <section className="recipe-grid__ratings">
                    <section
                        className="recipe-grid__stars">
                        { stars.map((star, index) => {
                            return (
                                <i 
                                    key={ "star_" + (index + 1) }
                                    id={ "star_" + (index + 1) }
                                    className="material-icons star-icon--edit"
                                    onClick={ this.setUserRating }>
                                    { star }
                                </i>
                            )
                        }) }
                    </section>
                    <h5 className="recipe-grid__rating-count">
                        My Rating
                    </h5>
                </section>
            );
        }
        else {
            return (
                <section className="recipe-grid__ratings">
                    <section
                        className="recipe-grid__stars">
                        { stars.map((star, index) => {
                            return (
                                <i key={"star_" + (index + 1)} className="material-icons star-icon">{ star }</i>
                            )
                        }) }
                    </section>
                    <h5 className="recipe-grid__rating-count">
                        { this.props.ratings.total + (this.props.ratings.total == 1 ? " Rating" : " Ratings") }
                    </h5>
                </section>
            );
        }
	};
};

const mapStateToProps = (state) => ({
        recipeId: state.filters.currentRecipe.info.id,
        editMode: state.filters.editMode,
        cancelChanges: state.filters.cancelChanges,
        ratings: {
            average: getAverageRating(state.filters.currentRecipe.ratings),
            total: state.filters.currentRecipe.ratings.length,
            user: getUserRating(state.filters.currentRecipe.ratings, state.user.id)
        }
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeRating: (rating) => dispatch(updateRecipeRating(rating))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeRatings);
