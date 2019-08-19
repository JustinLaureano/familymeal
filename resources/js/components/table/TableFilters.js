import React from 'react';
import RecipeCategoryFilter from '../filters/RecipeCategoryFilter';
import CuisineTypeFilter from '../filters/CuisineTypeFilter';
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