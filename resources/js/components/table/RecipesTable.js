import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class RecipesTable extends React.Component {
	render() {
		return (
			<section className="table">
			</section>
		)
	}
}

const mapStateToProps = (state) => {
    return {
		recipes: state.recipes,
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipesTable);