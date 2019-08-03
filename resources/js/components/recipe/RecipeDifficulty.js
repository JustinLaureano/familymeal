import React from 'react';
import { connect } from 'react-redux';
import { updateRecipeDifficulty } from '../../actions/recipes';

export class RecipeDifficulty extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            difficulty: this.props.difficulty,
            difficulties: ['Easy', 'Medium', 'Hard']
        };
    };
    
    componentDidUpdate() {
		if (!this.props.editMode && !this.props.cancelChanges) {
			this.saveRecipeDifficulty();
        }
        else if (this.props.cancelChanges && this.state.difficulty !== this.props.difficulty) {
            this.setState(() => ({ difficulty: this.props.difficulty }));
        }
    }

    setRecipeDifficulty = (e) => {
        const difficulty = e.target.value;
        this.setState(() => ({ difficulty }));
    }
    
    saveRecipeDifficulty = () => {
        const difficulty = this.state.difficulty;
        if (difficulty != this.props.difficulty) {
            this.props.updateRecipeDifficulty(difficulty);
        }
	}

	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Difficulty</h3>
                    <section className="select__wrapper">                    
                        <select
                            className="select"
                            value={ this.state.difficulty }
                            onChange={ this.setRecipeDifficulty }>
                            {
                                this.state.difficulties.map((difficulty) => {
                                    return (
                                        <option
                                            key={ difficulty }
                                            className="select__option"
                                            value={ difficulty }>
                                            { difficulty }
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <i className="material-icons select-icon">unfold_more</i>
                    </section>
				</section>
			);
		}
		else {
			return (
				<section className="recipe-grid__info-block">
					<h3>Difficulty</h3>
                	{ this.props.difficulty }
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    cancelChanges: state.filters.cancelChanges,
    difficulty: state.filters.currentRecipe.info.difficulty
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeDifficulty: (difficulty) => dispatch(updateRecipeDifficulty(difficulty))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDifficulty);
