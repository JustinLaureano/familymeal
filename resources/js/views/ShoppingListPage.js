import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class ShoppingListPage extends React.Component {
	render() {
		return (
			<section className="content">
				<Breadcrumbs />
				<h1>Shopping List</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => ({
	shopping_lists: state.shopping_lists
});
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);