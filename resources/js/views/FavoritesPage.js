import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeTableHeaders, getRecipeTableOptions } from '../services/Table';
import { getFavoriteRecipes } from '../actions/favoriteRecipes';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import Table from '../components/table/Table.js';

export class FavoritesPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			headers: getRecipeTableHeaders(),
			options: getRecipeTableOptions()
        };
	};

	componentDidMount() {
		if (this.props.recipes.length === 0) {
			if (this.state.user_id == 'undefined' || this.props.location.state && this.props.location.state.user_id) {
				this.props.getFavoriteRecipes(this.props.location.state.user_id);
			}
			else {
				this.props.getFavoriteRecipes();
			}
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
		const tableProps = {
			headers: this.state.headers,
			data: this.props.recipes,
			className: 'table__row--recipe',
			model: 'favorite-recipes',
			options: this.state.options,
			total: this.props.recipeTotal,
			refreshFavorites: this.refreshFavorites
		};
		const pageHeaderProps = {
			title: 'My Favorite Recipes',
			subtitle: {
				className: 'page-header__record-count',
				text: this.props.recipeTotal + ' Recipes Total'
			},
			options: {
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
		return (
			<section className="table-grid">
				<Breadcrumbs />
				<PageHeader {...pageHeaderProps} />
				<Table {...tableProps}/>
			</section>
		)
	}
}

const mapStateToProps = (state) => ({
	recipes: state.favorite_recipes,
	recipeTotal: state.totals.favorite_recipe,
	user_id: state.user.id
});
  
const mapDispatchToProps = (dispatch, props) => ({
	getFavoriteRecipes: (user_id, page) => dispatch(getFavoriteRecipes(user_id, page))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);