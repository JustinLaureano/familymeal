import React from 'react';
import { connect } from 'react-redux';
import { 
    changeTablePage, 
    addIngredientCategoryFilter, 
    removeIngredientCategoryFilter, 
    setIngredientSubcategoryFilter
} from '../../actions/filters';

export class IngredientCategoryFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            ingredient_categories: this.props.ingredient_categories,
            filteredCategories: this.props.filteredCategories
        }
    }

    componentDidUpdate() {
        if (this.state.ingredient_categories.length !== this.props.ingredient_categories.length) {
            this.setState({ ingredient_categories: this.props.ingredient_categories });
        }
        
        if (this.state.filteredCategories.length !== this.props.filteredCategories.length) {
            this.setState({ filteredCategories: this.props.filteredCategories });
        }
        
        if (this.state.menuOpen) {
            document.addEventListener('click', this.clickEvent);
            // this.getIngredientSubcategories();
        }
        else {
            document.removeEventListener('click', this.clickEvent);
        }
    }

    clickEvent = (e) => {
        if (!e.target.id.includes('category_') && this.state.menuOpen) {
            // mouse click was outside the category menu, so close the menu
            this.setState({ menuOpen: false });
        }
    }

    toggleCategoryFilterMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

    toggleCategoryOption = (e) => {
        const ingredientCategoryId = e.target.id.replace(/\D/g, '');

        e.target.className.includes('filter__suggestion--selected') ?
            this.props.removeIngredientCategoryFilter( parseInt(ingredientCategoryId) ) :
            this.props.addIngredientCategoryFilter( parseInt(ingredientCategoryId) );

        this.getIngredientSubcategories();
        this.props.changeTablePage(1, 'ingredient');
    }
    
    getIngredientSubcategories = () => {
        if (this.state.filteredCategories.length == 0) {
            // reset the filter
            this.props.setIngredientSubcategoryFilter([]);
        }
        else {
            let ingredient_subcategories = [];

            // only select ingredient_subcategories that belong to the selected categories
            // this.state.filteredCategories.map((category_id) => {
            //     const subcategories = this.props.ingredient_subcategories.filter(subcategory => subcategory.ingredient_category_id == category_id);
            //     ingredient_subcategories = [ ...ingredient_subcategories, ...subcategories ];
            // });

            // const subcategories = ingredient_subcategories.map(subcategory => subcategory.id);
            // this.props.setIngredientSubcategoryFilter(subcategories);
        }
    };

	render() {
		return (
            <div className="filter">
                <button className="filter__btn" onClick={ this.toggleCategoryFilterMenu }>
                Category
                <i className="material-icons dropdown-icon">arrow_drop_down</i>
                </button>
                <div className={ "filter__suggestions" + (this.state.menuOpen ? '' : ' display--none') }>
                    {
                        this.state.ingredient_categories.map((category) => {
                            return (
                                <div
                                    key={ "category_" + category.id }
                                    id={ "category_" + category.id }
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
    ingredient_categories: state.ingredient_categories,
    ingredient_subcategories: state.ingredient_subcategories,
    filteredCategories: state.filters.ingredient_category,
    filteredSubcategories: state.filters.ingredient_subcategory,
});

const mapDispatchToProps = (dispatch) => ({
    changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
    addIngredientCategoryFilter: (ingredientCategoryId) => dispatch(addIngredientCategoryFilter(ingredientCategoryId)),
    removeIngredientCategoryFilter: (ingredientCategoryId) => dispatch(removeIngredientCategoryFilter(ingredientCategoryId)),
    setIngredientSubcategoryFilter: (subcategories) => dispatch(setIngredientSubcategoryFilter(subcategories))
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCategoryFilter);
