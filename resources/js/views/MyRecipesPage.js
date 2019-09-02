import React from 'react';
import { connect } from 'react-redux';
import { getRecipeTableHeaders, getRecipeTableOptions } from '../services/Table';
import { changeTablePage, setRecipeCategoryFilter, setCuisineTypeFilter } from '../actions/filters';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import CardView from '../components/table/CardView';
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
			categoryFilter: this.props.categoryFilter,
			recipeView: this.props.recipeView
        };
	};

	componentWillMount() {
		if (this.props.location && this.props.location.state && this.props.location.state.recipe_category_id) {
			const recipe_category_id = this.props.location.state.recipe_category_id;
			this.props.setRecipeCategoryFilter(parseInt(recipe_category_id));
			this.props.changeTablePage(1, 'recipe');
		}
		else if (this.props.location && this.props.location.state && this.props.location.state.cuisine_type_id) {
			const cuisine_type_id = this.props.location.state.cuisine_type_id;
			this.props.setCuisineTypeFilter(parseInt(cuisine_type_id));
			this.props.changeTablePage(1, 'recipe');
		}
	}

	componentDidMount() {
		if (this.state.loading && this.props.recipes.length > 0) {
			this.setState({ loading: false, recipes: this.props.recipes });
		}
	}

	componentDidUpdate() {
		if (this.props.recipes.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.recipes.length > 0) {
			this.setState({ loading: false, recipes: this.props.recipes });
		}

		if (this.state.recipeView !== this.props.recipeView) {
			this.setState({ recipeView: this.props.recipeView });
		}
	}
	
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'recipes', path: '/recipes'}
		];
		const tableFilterProps = { table: 'recipes' };
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
		};
		if (this.state.loading) {
			return (
				<PageLoad />
			)
		}
		else {
			switch(this.state.recipeView) {
				case 'table':
					const tableProps = {
						headers: this.state.headers,
						data: this.props.recipes,
						className: 'table__row--recipe',
						model: 'recipe',
						options: this.state.options,
						total: this.props.recipeTotal
					};
					return (
						<section className="table-grid">
							<Breadcrumbs breadcrumbs={ breadcrumbProps } />
							<PageHeader { ...pageHeaderProps } />
							<TableFilters { ...tableFilterProps } />
							<Table { ...tableProps }/>
						</section>
					)
				case 'card':
					const cardViewProps = {
						type: 'recipe',
						cards: this.props.recipes
					};
					return (
						<section className="table-grid">
							<Breadcrumbs breadcrumbs={ breadcrumbProps } />
							<PageHeader { ...pageHeaderProps } />
							<TableFilters { ...tableFilterProps } />
							<CardView { ...cardViewProps }/>
						</section>
					)
				default:
					return (
						<section className="table-grid">
							<Breadcrumbs breadcrumbs={ breadcrumbProps } />
							<PageHeader { ...pageHeaderProps } />
							<TableFilters { ...tableFilterProps } />
							<Table { ...tableProps }/>
						</section>
					)
			}
		}

	}
}

const mapStateToProps = (state) => ({
	recipes: state.recipes,
	recipeTotal: state.totals.recipe,
	categoryFilter: state.filters.recipe_category,
	recipeView: state.ui.recipeView
});
  
const mapDispatchToProps = (dispatch) => ({
	changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
	setRecipeCategoryFilter: (recipe_category_id) => dispatch(setRecipeCategoryFilter(recipe_category_id)),
	setCuisineTypeFilter: (cuisine_type_id) => dispatch(setCuisineTypeFilter(cuisine_type_id))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);