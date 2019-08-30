import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class MealPlannerPage extends React.Component {
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'meal planner', path: '/meal-planner'}
		];
		return (
			<section className="content">
				<Breadcrumbs breadcrumbs={ breadcrumbProps } />
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