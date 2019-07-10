import React from 'react';
import { connect } from 'react-redux';
import { getAverageRating } from '../../helpers/Recipe';

export class RecipeSummary extends React.Component {
	render() {
		if (this.props.editMode) {
			return (
				<textarea
					className="recipe-grid__summary textarea--edit"
					placeholder="Summary">
					{this.props.summary}
				</textarea>
			);
		}
		else {
			return (
				<section className="recipe-grid__summary">
					{this.props.summary}
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => {
	return {
        recipeId: state.filters.currentRecipe.info.id,
		summary: state.filters.currentRecipe.summary.summary,
		editMode: state.filters.editMode
	}
};
  
export default connect(mapStateToProps)(RecipeSummary);
