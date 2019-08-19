import React from 'react';
import { connect } from 'react-redux';
import { getIngredientTableHeaders, getIngredientTableOptions } from '../services/Table';
import { changeTablePage, setIngredientCategoryFilter, setIngredientSubcategoryFilter } from '../actions/filters';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import TableFilters from '../components/table/TableFilters.js';
import Table from '../components/table/Table.js';

export class IngredientsPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			loading: true,
			headers: getIngredientTableHeaders(),
			options: getIngredientTableOptions(),
			categoryFilter: this.props.categoryFilter,
			subcategoryFilter: this.props.subcategoryFilter,
        };
	};

	componentWillMount() {
		if (this.props.location && this.props.location.state && this.props.location.state.ingredient_category_id) {
			const ingredient_category_id = this.props.location.state.ingredient_category_id;
			this.props.setIngredientCategoryFilter(parseInt(ingredient_category_id));
			this.props.changeTablePage(1, 'ingredient');
		}
	}

	componentDidMount() {
		if (this.state.loading && this.props.ingredients.length > 0) {
			this.setState({ loading: false });
		}
	}

	componentDidUpdate() {
		if (this.props.ingredients.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.ingredients.length > 0) {
			this.setState({ loading: false });
		}
	}
	
	render() {
		const tableProps = {
			headers: this.state.headers,
			data: this.props.recipes,
			className: 'table__row--recipe',
			model: 'ingredient',
			options: this.state.options,
			total: this.props.ingredientTotal
		};
		const pageHeaderProps = {
			title: 'Ingredients',
			subtitle: {
				className: 'page-header__record-count',
				text: this.props.ingredientTotal + ' Ingredients Total'
			},
			options: {
				search: {
					type: 'ingredient'
				},
				buttons: [
					{
						link: 'ingredients/create',
						className: 'btn--primary',
						icon: 'add',
						label: 'New Ingredient'
					}
				]
			}
		}
		const tableFilterProps = {
			table: 'ingredients'
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

const mapStateToProps = (state) => ({
	recipes: state.recipes,
	recipeTotal: state.totals.recipe,
	categoryFilter: state.filters.ingredient_category,
	subcategoryFilter: state.filters.ingredient_subcategory
});
  
const mapDispatchToProps = (dispatch, props) => ({
	changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
	setIngredientCategoryFilter: (ingredient_category_id) => dispatch(setIngredientCategoryFilter(ingredient_category_id)),
	setIngredientSubcategoryFilter: (ingredient_subcategory_id) => dispatch(setIngredientCategoryFilter(ingredient_subcategory_id))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(IngredientsPage);