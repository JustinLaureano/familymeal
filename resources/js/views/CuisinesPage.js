import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export class CuisinesPage extends React.Component {
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'cuisines', path: '/cuisines'},
		];
		return (
			<section className="">
				<Breadcrumbs breadcrumbs={ breadcrumbProps } />
				<h1>Cuisines</h1>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
};
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CuisinesPage);