import React from 'react';
import { connect } from 'react-redux';
import { getRecipeTableHeaders, getRecipeTableOptions } from '../services/Table';
import { getFavoriteRecipes, clearFavoriteRecipes } from '../actions/favoriteRecipes';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import CardView from '../components/table/CardView';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import Table from '../components/table/Table.js';
import TableFilters from '../components/table/TableFilters.js';
import TableFooter from '../components/table/TableFooter';

export class FavoritesPage extends React.Component {
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

	componentDidUpdate() {
		if (this.props.recipes.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
			this.props.getFavoriteRecipes();
		}
		else if (this.state.loading && this.props.recipes.length > 0) {
			this.setState({ loading: false, recipes: this.props.recipes });
		}

		if (this.state.recipeView !== this.props.recipeView) {
			this.setState({ recipeView: this.props.recipeView });
		}
	}

	componentDidMount() {
		if (this.state.loading && this.props.recipes.length > 0) {
			this.setState({ loading: false, recipes: this.props.recipes });
		}

		if (this.props.recipes.length === 0) {
			if (this.props.user_id == 'undefined' || this.props.location.state && this.props.location.state.user_id) {
				this.props.getFavoriteRecipes(this.props.location.state.user_id);
			}
			else {
				this.props.getFavoriteRecipes();
			}
		}
	}

	componentWillMount() {
		if (this.props.recipes.length > 0) {
			this.props.clearFavoriteRecipes();
		}
	}

	refreshFavorites = () => {
		let currentPage = 1;
		const currentPageBtn = document.querySelector('.btn--table-active');
		if (currentPageBtn) {
			const currentPageNumber = parseInt(currentPageBtn.innerHTML);
			if (currentPageNumber) {
				currentPage = currentPageNumber;
			}
		}
		this.props.getFavoriteRecipes(this.props.user_id, currentPage);
	}
	
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'favorites', path: '/favorites'}
		];
		const tableFilterProps = { table: 'recipes' };
		const pageHeaderProps = {
			title: 'My Favorite Recipes',
			subtitle: {
				className: 'page-header__record-count',
				text: this.props.recipeTotal + ' Recipes Total'
			},
			options: {
				search: {
					type: 'favorite'
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
		if (this.state.loading) {
			return ( <PageLoad /> )
		}
		else {
			switch(this.state.recipeView) {
				case 'table':
					const tableProps = {
						headers: this.state.headers,
						data: this.props.recipes,
						className: 'table__row--recipe',
						model: 'favorite-recipes',
						options: this.state.options,
						total: this.props.recipeTotal,
						refreshFavorites: this.refreshFavorites
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
						model: 'recipe',
						cards: this.props.recipes,
						options: this.state.options
					};
					const tableFooterProps = {
						model: 'recipe',
						total: this.props.recipeTotal,
						view: 'card'
					};
					return (
						<section className="table-grid">
							<Breadcrumbs breadcrumbs={ breadcrumbProps } />
							<PageHeader { ...pageHeaderProps } />
							<TableFilters { ...tableFilterProps } />
							<CardView { ...cardViewProps }/>
							<TableFooter { ...tableFooterProps } />
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
	recipes: state.favorite_recipes,
	recipeTotal: state.totals.favorite_recipe,
	user_id: state.user.id,
	categoryFilter: state.filters.recipe_category,
	recipeView: state.ui.recipeView
});
  
const mapDispatchToProps = (dispatch) => ({
	getFavoriteRecipes: (user_id, page) => dispatch(getFavoriteRecipes(user_id, page)),
	clearFavoriteRecipes: () => dispatch(clearFavoriteRecipes())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);