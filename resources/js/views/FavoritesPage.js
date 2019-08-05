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
		console.log('get favorites');
		if (this.props.recipes.length === 0) {
			this.props.getFavoriteRecipes();
		}
	}
	
	render() {
		const tableProps = {
			headers: this.state.headers,
			data: this.props.recipes,
			className: 'table__row--recipe',
			model: 'favorite-recipes',
			options: this.state.options,
			total: this.props.recipeTotal
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

const mapStateToProps = (state) => {
	return {
		recipes: state.favorite_recipes,
		recipeTotal: state.totals.favorite_recipe
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
	getFavoriteRecipes: () => dispatch(getFavoriteRecipes())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);