import React from 'react';
import { connect } from 'react-redux';
import { changeTablePage, addIngredientSubcategoryFilter, removeIngredientSubcategoryFilter } from '../../actions/filters';

export class IngredientSubcategoryFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            ingredient_subcategories: this.props.ingredient_subcategories,
            filteredCategories: this.props.filteredCategories
        }
    }

    componentDidUpdate() {
        if (this.state.ingredient_subcategories.length !== this.props.ingredient_subcategories.length) {
            this.setState({ ingredient_subcategories: this.props.ingredient_subcategories });
        }
        
        if (this.state.filteredCategories.length !== this.props.filteredCategories.length) {
            this.setState({ filteredCategories: this.props.filteredCategories });
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
                Subcategory
                <i className="material-icons dropdown-icon">arrow_drop_down</i>
                </button>
                <div className={ "filter__suggestions" + (this.state.menuOpen ? '' : ' display--none') }>
                    {
                        this.state.ingredient_subcategories.map((category) => {
                            return (
                                <div
                                    key={ "subcategory_" + category.id }
                                    id={ "subcategory_" + category.id }
                                    onClick={ this.toggleCategoryOption }
                                    className={ this.state.filteredCategories.includes(category.id) ? ' filter__suggestion--selected' : 'filter__suggestion' }>
                                    { category.name }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
		);
	};
};

const mapStateToProps = (state) => ({
    ingredient_subcategories: state.ingredient_subcategories,
    filteredCategories: state.filters.ingredient_subcategory
});

const mapDispatchToProps = (dispatch) => ({
    changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
    addIngredientSubcategoryFilter: (ingredientSubcategoryId) => dispatch(addIngredientCategoryFilter(ingredientSubcategoryId)),
    removeIngredientSubcategoryFilter: (ingredientSubcategoryId) => dispatch(removeIngredientCategoryFilter(ingredientSubcategoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientSubcategoryFilter);
