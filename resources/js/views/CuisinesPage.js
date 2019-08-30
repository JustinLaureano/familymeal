import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import CardView from '../components/table/CardView';
import { getRecipeCountByCuisine } from '../services/Cards';

export class CuisinesPage extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
			loading: true,
			cuisines: this.props.cuisines,
			totals: [],
			needsTotals: this.needsTotals()
        };
	};

	componentDidMount() {
		if (this.state.loading && this.props.cuisines.length > 0) {
			this.setState({ loading: false });

			if (this.state.totals.length == 0) {
				getRecipeCountByCuisine().then((totals) => {
					this.setState({ totals, needsTotals: false });
				});
			}
		}
	}

	componentDidUpdate() {
		if (this.props.cuisines.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.cuisines.length > 0) {
			this.setState({ cuisines: this.props.cuisines });
			this.setState({ loading: false });

			if (this.state.needsTotals) {
				getRecipeCountByCuisine().then((totals) => {
					this.setState({ totals, needsTotals: false });
				});
			}
		}
	}

	needsTotals() {
		return this.props.location && this.props.location.state && this.props.location.state.user_id;
	}
	
	render() {
		const breadcrumbProps = [
			{slug: 'home', path: '/'},
			{slug: 'cuisines', path: '/cuisines'}
		];
		const pageHeaderProps = {
			title: 'Cuisines',
			subtitle: {
				className: 'page-header__record-count',
				text: this.state.cuisines.length + ' Cuisine Types'
			}
		}
		const cardViewProps = {
			type: 'cuisine',
			cards: this.state.cuisines,
			totals: this.state.totals
		};
		if (this.state.loading) {
			return (
				<PageLoad />
			)
		}
		else {
			return (
				<section className="table-grid--simple">
					<Breadcrumbs breadcrumbs={ breadcrumbProps } />
					<PageHeader { ...pageHeaderProps } />
					<CardView { ...cardViewProps }/>
				</section>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	cuisines: state.cuisine_types
});
  
export default connect(mapStateToProps)(CuisinesPage);