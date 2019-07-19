import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeTableHeaders, getRecipeTableOptions } from '../services/Table';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import Table from '../components/table/Table.js';

export class MyRecipesPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			headers: getRecipeTableHeaders(),
			options: getRecipeTableOptions(),
        };
	};
	
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
		recipes: state.recipes,
		recipeTotal: state.totals.recipe
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);