import React from 'react';
import { connect } from 'react-redux';
import { updateRecipeCookTime } from '../../actions/recipes';

export class RecipeCookTime extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            cook_time: this.props.cook_time
        };
    };
    
    componentDidUpdate() {
		if (!this.props.editMode && !this.props.cancelChanges) {
			this.saveRecipeCookTime();
        }
        else if (this.props.cancelChanges && this.state.cook_time !== this.props.cook_time) {
            this.setState(() => ({ cook_time: this.props.cook_time }));
        }
    }

    setRecipeCookTime = (e) => {
        const cook_time = e.target.value;
        this.setState(() => ({ cook_time }));
    }
    
    saveRecipeCookTime = () => {
        const cook_time = this.state.cook_time;
        if (cook_time != this.props.cook_time) {
            this.props.updateRecipeCookTime(cook_time);
        }
	}

	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Cook Time</h3>
                    <input
                        className="recipe-grid__info-input"
                        value={ this.state.cook_time }
                        onChange={ this.setRecipeCookTime }
                        placeholder="(ex) 10 minutes" />
				</section>
			);
		}
		else {
			return (
				<section className="recipe-grid__info-block">
					<h3>Cook Time</h3>
                	{ this.props.cook_time }
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    cancelChanges: state.filters.cancelChanges,
    cook_time: state.filters.currentRecipe.info.cook_time
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeCookTime: (cook_time) => dispatch(updateRecipeCookTime(cook_time))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCookTime);
