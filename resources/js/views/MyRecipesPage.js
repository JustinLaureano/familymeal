import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import RecipesTable from '../components/navigation/Breadcrumbs';

export class MyRecipesPage extends React.Component {	
	render() {
		return (
			<section className="table-grid">
				<Breadcrumbs />
				<section className="page-header">
					<h1 className="page-header__title">My Recipes</h1>
				</section>
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