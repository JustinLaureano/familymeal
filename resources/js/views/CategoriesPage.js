import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import CardView from '../components/table/CardView';
import { getRecipeCountByCategory } from '../services/Cards';

export class CategoriesPage extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
			loading: true,
			categories: this.props.categories,
			totals: [],
			needsTotals: this.needsTotals()
        };
	};

	componentDidMount() {
		if (this.state.loading && this.props.categories.length > 0) {
			this.setState({ loading: false });

			if (this.state.totals.length == 0) {
				getRecipeCountByCategory().then((totals) => {
					this.setState({ totals, needsTotals: false });
				});
			}
		}
	}

	componentDidUpdate() {
		if (this.props.categories.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.categories.length > 0) {
			this.setState({ categories: this.props.categories });
			this.setState({ loading: false });

			if (this.state.needsTotals) {
				getRecipeCountByCategory().then((totals) => {
					this.setState({ totals, needsTotals: false });
				});
			}
		}
	}

	needsTotals() {
		return this.props.location && this.props.location.state && this.props.location.state.user_id;
	}
	
	render() {
		const pageHeaderProps = {
			title: 'Categories',
			subtitle: {
				className: 'page-header__record-count',
				text: this.state.categories.length + ' Categories'
			}
		}
		const cardViewProps = {
			type: 'category',
			cards: this.state.categories,
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
					<Breadcrumbs />
					<PageHeader { ...pageHeaderProps } />
					<CardView { ...cardViewProps }/>
				</section>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	categories: state.recipe_categories
});

const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);