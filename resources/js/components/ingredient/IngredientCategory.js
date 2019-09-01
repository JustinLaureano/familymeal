import React from 'react';
import { connect } from 'react-redux';

export class IngredientCategory extends React.Component {
	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Category</h3>
                    <section className="select__wrapper">                    
                        <select
                            name="ingredient-category"
                            className="select"
                            value={ this.props.category.id ? this.props.category.id : '' }
                            onChange={ this.props.setIngredientCategory }>
                            <option
                                key="ingredient-category"
                                className="select__option"
                                value="">
                            </option>
                            {
                                this.props.ingredientCategories.map((category) => {
                                    return (
                                        <option
                                            key={ "category_" + category.id }
                                            id={ "category_" + category.id }
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
                	{ this.props.category.name == null ? 'n/a' : this.props.category.name }
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode
});
  
export default connect(mapStateToProps)(IngredientCategory);