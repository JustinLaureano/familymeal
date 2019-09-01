import React from 'react';
import { connect } from 'react-redux';

export class IngredientSubcategory extends React.Component {
	render() {
		if (this.props.editMode) {
			return (
				<section className="recipe-grid__info-block">
					<h3>Subcategory</h3>
                    <section className="select__wrapper">                    
                        <select
                            name="ingredient-subcategory"
                            className="select"
                            value={ this.props.subcategory.id ? this.props.subcategory.id : '' }
                            onChange={ this.props.setIngredientSubcategory }>
                            <option
                                key="ingredient-subcategory"
                                className="select__option"
                                value="">
                            </option>
                            {
                                this.props.ingredientSubcategories.map((subcategory) => {
                                    return (
                                        <option
                                            key={ "subcategory_" + subcategory.id }
                                            id={ "subcategory_" + subcategory.id }
                                            className="select__option"
                                            value={ subcategory.id }>
                                            { subcategory.name }
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
					<h3>Subcategory</h3>
                	{ this.props.subcategory.name == null ? 'n/a' : this.props.subcategory.name }
				</section>
			);
		}
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode
});
  
export default connect(mapStateToProps)(IngredientSubcategory);