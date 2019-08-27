import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTablePage, addRecipeCategoryFilter, removeRecipeCategoryFilter } from '../../actions/filters';

export class RecipeCategoryFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            recipe_categories: this.props.recipe_categories,
            filteredCategories: this.props.filteredCategories
        }
    }

    componentDidUpdate() {
        if (this.state.recipe_categories.length !== this.props.recipe_categories.length) {
            this.setState({ recipe_categories: this.props.recipe_categories });
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
        if (!e.target.id.includes('category_') && this.state.menuOpen) {
            // mouse click was outside the category menu, so close the menu
            this.setState({ menuOpen: false });
        }
    }

    toggleCategoryFilterMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

    toggleCategoryOption = (e) => {
        const recipeCategoryId = e.target.id.replace(/\D/g, '');

        e.target.className.includes('filter__suggestion--selected') ?
            this.props.removeRecipeCategoryFilter( parseInt(recipeCategoryId) ) :
            this.props.addRecipeCategoryFilter( parseInt(recipeCategoryId) );

        this.props.changeTablePage(1, 'recipe');
    }

	render() {
		return (
            <div className="filter">
                <button className="filter__btn" onClick={ this.toggleCategoryFilterMenu }>
                { this.state.filteredCategories.length > 0 ? '(' + this.state.filteredCategories.length + ')' : '' } Category
                <i className="material-icons dropdown-icon">arrow_drop_down</i>
                </button>
                <div className={ "filter__suggestions" + (this.state.menuOpen ? '' : ' display--none') }>
                    {
                        this.state.recipe_categories.map((category) => {
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
    recipe_categories: state.recipe_categories,
    filteredCategories: state.filters.recipe_category
});

const mapDispatchToProps = (dispatch) => ({
    changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
    addRecipeCategoryFilter: (recipeCategoryId) => dispatch(addRecipeCategoryFilter(recipeCategoryId)),
    removeRecipeCategoryFilter: (recipeCategoryId) => dispatch(removeRecipeCategoryFilter(recipeCategoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCategoryFilter);
