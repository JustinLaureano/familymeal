import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RecipeCategoryFilter from '../filters/RecipeCategoryFilter';
import CuisineTypeFilter from '../filters/CuisineTypeFilter';

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
        }
	}
}

export default TableFilters;