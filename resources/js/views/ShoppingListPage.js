import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ShoppingListPage extends React.Component {
	render() {
		return (
			<section className="">
				<h1>Shopping List</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
		recipe: state.recipes,
		user: state.user
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);