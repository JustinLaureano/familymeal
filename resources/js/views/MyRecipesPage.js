import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeTableHeaders, getRecipeTableOptions } from '../helpers/Table';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import Table from '../components/table/Table.js';

export class MyRecipesPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			headers: getRecipeTableHeaders(),
			options: getRecipeTableOptions()
        };
	};
	
	render() {
		const props = {
			headers: this.state.headers,
			data: this.props.recipes,
			className: 'table__row--recipe',
			model: 'recipe',
			options: this.state.options,
		};
		return (
			<section className="table-grid">
				<Breadcrumbs />
				<section className="page-header">
					<h1 className="page-header__title">My Recipes</h1>
				</section>
				<Table {...props}/>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        recipes: state.recipes
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);