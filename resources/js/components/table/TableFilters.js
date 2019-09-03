import React from 'react';
import RecipeCategoryFilter from '../filters/RecipeCategoryFilter';
import CuisineTypeFilter from '../filters/CuisineTypeFilter';
import RecipeViewStyle from '../filters/RecipeViewStyle';
import IngredientCategoryFilter from '../filters/IngredientCategoryFilter';
import IngredientSubcategoryFilter from '../filters/IngredientSubcategoryFilter';

export class TableFilters extends React.Component {
	render() {
        switch(this.props.table) {
            case 'recipes':
                return (
                    <section className="table-filter">
                        <RecipeCategoryFilter />
                        <CuisineTypeFilter />
                        <RecipeViewStyle />
                    </section>
                )
            case 'favorite-recipes':
                return (
                    <section className="table-filter">
                        <RecipeCategoryFilter model='favorite-recipes'/>
                        <CuisineTypeFilter  model='favorite-recipes'/>
                        <RecipeViewStyle />
                    </section>
                )
            case 'ingredients':
                return (
                    <section className="table-filter">
                        <IngredientCategoryFilter />
                        <IngredientSubcategoryFilter />
                    </section>
                )
        }
	}
}

export default TableFilters;