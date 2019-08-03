import React from 'react';
import { connect } from 'react-redux';
import { updateRecipePortions } from '../../actions/recipes';

export class RecipePortions extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            portions: this.props.portions
        };
    };
    
    componentDidUpdate() {
		if (!this.props.editMode && !this.props.cancelChanges) {
			this.saveRecipePortions();
        }
        else if (this.props.cancelChanges && this.state.portions !== this.props.portions) {
            this.setState(() => ({ portions: this.props.portions }));
        }
    }

    setRecipePortions = (e) => {
        const portions = e.target.value;
        this.setState(() => ({ portions }));
    }
    
    saveRecipePortions = () => {
        const portions = this.state.portions;
        if (portions != this.props.portions) {
            this.props.updateRecipePortions(portions);
        }
	}

	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Portions</h3>
                    <input
                        className="recipe-grid__info-input"
                        value={ this.state.portions }
                        onChange={ this.setRecipePortions }
                        placeholder="(ex) 2 - 4" />
				</section>
			);
		}
		else {
			return (
				<section className="recipe-grid__info-block">
					<h3>Portions</h3>
                	{ this.props.portions }
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    cancelChanges: state.filters.cancelChanges,
    portions: state.filters.currentRecipe.info.portions
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipePortions: (portions) => dispatch(updateRecipePortions(portions))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipePortions);
