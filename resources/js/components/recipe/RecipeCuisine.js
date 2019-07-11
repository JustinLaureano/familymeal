import React from 'react';
import { connect } from 'react-redux';
import { updateRecipeCuisine } from '../../actions/recipes';

export class RecipeCuisine extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            cuisine: this.props.cuisine
        };
    };
    
    componentDidUpdate() {
		if (!this.props.editMode) {
			this.saveRecipeCuisine();
		}
    }

    setRecipeCuisine = (e) => {
        const cuisine = {
            id: e.target.value,
            name: document.querySelector("option[value='"+ e.target.value +"']").innerHTML
        };
        this.setState(() => ({ cuisine }));
    }
    
    saveRecipeCuisine = () => {
        const cuisine = this.state.cuisine;
		if (cuisine.id != this.props.cuisine.id) {
			this.props.updateRecipeCuisine(cuisine);
		}
	}

	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Cuisine</h3>
                    <section className="select__wrapper">                    
                        <select
                            className="select"
                            value={ this.state.cuisine.id }
                            onChange={ this.setRecipeCuisine }>
                            {
                                this.props.cuisine_types.map((cuisine) => {
                                    return (
                                        <option
                                            key={ "cuisine_" + cuisine.id }
                                            className="select__option"
                                            value={ cuisine.id }>
                                            { cuisine.name }
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
					<h3>Cuisine</h3>
                	{this.props.cuisine.name}
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    cuisine: {
        id: state.filters.currentRecipe.info.cuisine_type_id,
        name: state.filters.currentRecipe.info.cuisine_type
    },
    cuisine_types: state.cuisine_types
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeCuisine: (cuisine) => dispatch(updateRecipeCuisine(cuisine))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCuisine);
