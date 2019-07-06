import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class MealPlannerPage extends React.Component {
	render() {
		return (
			<section className="content">
				<Breadcrumbs />
				<h1>Meal Planner</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MealPlannerPage);