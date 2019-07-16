import React from 'react';
import { connect } from 'react-redux';
import { updateRecipePrepTime } from '../../actions/recipes';

export class RecipePrepTime extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            prep_time: this.props.prep_time
        };
    };
    
    componentDidUpdate() {
		if (!this.props.editMode) {
			this.saveRecipePrepTime();
		}
    }

    setRecipePrepTime = (e) => {
        const prep_time = e.target.value;
        this.setState(() => ({ prep_time }));
    }
    
    saveRecipePrepTime = () => {
        const prep_time = this.state.prep_time;
        if (prep_time != this.props.prep_time) {
            this.props.updateRecipePrepTime(prep_time);
        }
	}

	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Prep Time</h3>
                    <input
                        className="recipe-grid__info-input"
                        value={ this.state.prep_time }
                        onChange={ this.setRecipePrepTime }
                        placeholder="(ex) 10 minutes" />
				</section>
			);
		}
		else {
			return (
				<section className="recipe-grid__info-block">
					<h3>Prep Time</h3>
                	{ this.props.prep_time }
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    prep_time: state.filters.currentRecipe.info.prep_time
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipePrepTime: (prep_time) => dispatch(updateRecipePrepTime(prep_time))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipePrepTime);
