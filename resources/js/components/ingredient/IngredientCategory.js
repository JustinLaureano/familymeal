import React from 'react';
import { connect } from 'react-redux';
import { updateIngredientCategory } from '../../actions/ingredients';

export class IngredientCategory extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            category: this.props.category
        };
    };
    
    componentDidUpdate() {
		if (!this.props.editMode && !this.props.cancelChanges) {
			this.saveIngredientCategory();
        }
        else if (this.props.cancelChanges && this.state.category !== this.props.category) {
            this.setState(() => ({ category: this.props.category }));
        }
    }

    setIngredientCategory = (e) => {
        const category = {
            id: e.target.value,
            name: document.querySelector("option[value='"+ e.target.value +"']").innerHTML
        };
        this.setState(() => ({ category }));
    }
    
    saveIngredientCategory = () => {
        const category = this.state.category;
		if (category.id != this.props.category.id) {
			this.props.updateIngredientCategory(category);
		}
	}

	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Category</h3>
                    <section className="select__wrapper">                    
                        <select
                            name="ingredient-category"
                            className="select"
                            value={ this.state.category.id }
                            onChange={ this.setIngredientCategory }>
                            <option
                                key="ingredient-category"
                                className="select__option"
                                value="">
                            </option>
                            {
                                this.props.ingredient_categories.map((category) => {
                                    return (
                                        <option
                                            key={ "category_" + category.id }
                                            className="select__option"
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
                	{ this.props.category.name }
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    cancelChanges: state.filters.cancelChanges,
    category: {
        id: state.filters.currentIngredient.ingredient_category_id,
        name: state.filters.currentIngredient.ingredient_category_name
    },
    ingredient_categories: state.ingredient_categories
});

const mapDispatchToProps = (dispatch, props) => ({
	updateIngredientCategory: (category) => dispatch(updateIngredientCategory(category))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(IngredientCategory);
