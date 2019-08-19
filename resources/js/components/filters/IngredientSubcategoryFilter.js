import React from 'react';
import { connect } from 'react-redux';
import { changeTablePage, addIngredientSubcategoryFilter, removeIngredientSubcategoryFilter } from '../../actions/filters';

export class IngredientSubcategoryFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            ingredient_subcategories: this.props.ingredient_subcategories,
            filteredSubcategory: this.props.filteredSubcategory
        }
    }

    componentDidUpdate() {
        if (this.state.ingredient_subcategories.length !== this.props.ingredient_subcategories.length) {
            this.setState({ ingredient_subcategories: this.props.ingredient_subcategories });
        }
        
        if (this.state.filteredSubcategory.length !== this.props.filteredSubcategory.length) {
            this.setState({ filteredSubcategory: this.props.filteredSubcategory });
        }
        
        if (this.state.menuOpen) {
            document.addEventListener('click', this.clickEvent);
        }
        else {
            document.removeEventListener('click', this.clickEvent);
        }
    }

    clickEvent = (e) => {
        if (!e.target.id.includes('subcategory_') && this.state.menuOpen) {
            // mouse click was outside the category menu, so close the menu
            this.setState({ menuOpen: false });
        }
    }

    toggleCategoryFilterMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

    toggleCategoryOption = (e) => {
        const ingredientSubcategoryId = e.target.id.replace(/\D/g, '');

        e.target.className.includes('filter__suggestion--selected') ?
            this.props.removeIngredientSubcategoryFilter( parseInt(ingredientSubcategoryId) ) :
            this.props.addIngredientSubcategoryFilter( parseInt(ingredientSubcategoryId) );

        this.props.changeTablePage(1, 'ingredient');
    }

	render() {
		return (
            <div className="filter">
                <button className="filter__btn" onClick={ this.toggleCategoryFilterMenu }>
                    { this.state.filteredSubcategory.length > 0 ? '(' + this.state.filteredSubcategory.length + ')' : '' } Subcategory
                    <i className="material-icons dropdown-icon">{ this.state.menuOpen ? 'arrow_drop_up' : 'arrow_drop_down' }</i>
                </button>
                
                <div className={ "filter__suggestions" + (this.state.menuOpen ? '' : ' display--none') }>
                    {
                        this.state.ingredient_subcategories.map((category) => {
                            if (this.props.filteredCategory.length == 0 || this.props.filteredCategory.indexOf(category.ingredient_category_id) >= 0) {
                                return (
                                    <div
                                        key={ "subcategory_" + category.id }
                                        id={ "subcategory_" + category.id }
                                        onClick={ this.toggleCategoryOption }
                                        className={ this.state.filteredSubcategory.includes(category.id) ? ' filter__suggestion--selected' : 'filter__suggestion' }>
                                        { category.name }
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
		);
	};
};

const mapStateToProps = (state) => ({
    ingredient_subcategories: state.ingredient_subcategories,
    filteredCategory: state.filters.ingredient_category,
    filteredSubcategory: state.filters.ingredient_subcategory
});

const mapDispatchToProps = (dispatch) => ({
    changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
    addIngredientSubcategoryFilter: (ingredientSubcategoryId) => dispatch(addIngredientSubcategoryFilter(ingredientSubcategoryId)),
    removeIngredientSubcategoryFilter: (ingredientSubcategoryId) => dispatch(removeIngredientSubcategoryFilter(ingredientSubcategoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientSubcategoryFilter);
