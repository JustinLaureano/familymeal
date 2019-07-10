import React from 'react';
import { connect } from 'react-redux';
import { updateRecipeCategory } from '../../actions/recipes';

export class RecipeCategory extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            category: this.props.category
        };
    };
    
    componentDidUpdate() {
		if (!this.props.editMode) {
			this.saveRecipeCategory();
		}
    }

    setRecipeCategory = (e) => {
        const category = {
            id: e.target.value,
            name: document.querySelector("option[class='select__option--category'][value='"+ e.target.value +"']").innerHTML
        };
        this.setState(() => ({ category }));
    }
    
    saveRecipeCategory = () => {
        const category = this.state.category;
		if (category.id != this.props.category.id) {
			this.props.updateRecipeCategory(category);
		}
	}

	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Category</h3>
                    <section className="select__wrapper">                    
                        <select
                            className="select"
                            value={ this.state.category.id }
                            onChange={ this.setRecipeCategory }>
                            {
                                this.props.recipe_categories.map((category) => {
                                    return (
                                        <option
                                            key={ "category_" + category.id }
                                            className="select__option--category"
                                            value={ category.id }>
                                            { category.name }
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
					<h3>Category</h3>
                	{this.props.category.name}
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => {
	return {
        editMode: state.filters.editMode,
        category: {
            id: state.filters.currentRecipe.info.recipe_category_id,
            name: state.filters.currentRecipe.info.recipe_category_name
        },
        recipe_categories: state.recipe_categories
	}
};

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeCategory: (category) => dispatch(updateRecipeCategory(category))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCategory);
