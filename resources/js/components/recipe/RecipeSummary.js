import React from 'react';
import { connect } from 'react-redux';
import { updateRecipeSummary } from '../../actions/recipes';

export class RecipeSummary extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            summary: this.props.summary
        };
	};

	componentDidUpdate() {
		if (!this.props.editMode && !this.props.cancelChanges) {
			this.saveRecipeSummary();
		}
		else if (this.props.cancelChanges && this.state.summary !== this.props.summary) {
            this.setState(() => ({ summary: this.props.summary }));
        }
	}
	
	setSummary = (e) => {
        const summary = e.target.value;
        this.setState(() => ({ summary }));
    }

    saveRecipeSummary = () => {
		const summary = this.state.summary;
		if (summary != this.props.summary) {
			document.querySelector("section[class='recipe-grid__summary']").innerHTML = summary;
			console.log(summary);
			this.props.updateRecipeSummary(summary);
		}
	}
	
	render() {
		if (this.props.editMode) {
			return (
				<textarea
					className="recipe-grid__summary textarea--edit"
					placeholder="Summary"
					onChange={ this.setSummary }
					value={ this.state.summary } />
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
		editMode: state.filters.editMode,
		cancelChanges: state.filters.cancelChanges
	}
};

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeSummary: (summary) => dispatch(updateRecipeSummary(summary))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeSummary);
