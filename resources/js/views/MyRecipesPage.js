import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getData } from '../actions/auth';

export class MyRecipesPage extends React.Component {
	componentDidMount() {
		// this.props.getData();
	};

	render() {
		return (
			<section className="">
				<h1>My Recipes</h1>
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
	getData: () => dispatch(getData())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);