import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeTableHeaders, getRecipeTableOptions } from '../services/Table';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import TableFilters from '../components/table/TableFilters.js';
import Table from '../components/table/Table.js';

export class MyRecipesPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			loading: true,
			headers: getRecipeTableHeaders(),
			options: getRecipeTableOptions(),
			categoryFilter: this.props.categoryFilter
        };
	};

	componentDidMount() {
		console.log(this.state, this.props);
		if (this.state.loading && this.props.recipes.length > 0) {
			this.setState({ loading: false });
		}
	}

	componentDidUpdate() {
		if (this.props.recipes.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.recipes.length > 0) {
			this.setState({ loading: false });
		}
	}
	
	render() {
		const tableProps = {
			headers: this.state.headers,
			data: this.props.recipes,
			className: 'table__row--recipe',
			model: 'recipe',
			options: this.state.options,
			total: this.props.recipeTotal
		};
		const pageHeaderProps = {
			title: 'My Recipes',
			subtitle: {
				className: 'page-header__record-count',
				text: this.props.recipeTotal + ' Recipes Total'
			},
			options: {
				search: {
					type: 'recipe'
				},
				buttons: [
					{
						link: 'recipes/create',
						className: 'btn--primary',
						icon: 'add',
						label: 'New Recipe'
					}
				]
			}
		}
		const tableFilterProps = {
			table: 'recipes'
		}
		if (this.state.loading) {
			return (
				<PageLoad />
			)
		}
		else {
			return (
				<section className="table-grid">
					<Breadcrumbs />
					<PageHeader { ...pageHeaderProps } />
					<TableFilters { ...tableFilterProps } />
					<Table { ...tableProps }/>
				</section>
			)
		}

	}
}

const mapStateToProps = (state) => {
	return {
		recipes: state.recipes,
		recipeTotal: state.totals.recipe,
		categoryFilter: state.filters.recipe_category
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);