import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import CardView from '../components/table/CardView';
import { getRecipesByCategoryTotals } from '../services/Cards';

export class CategoriesPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			loading: true,
			categories: this.props.categories,
			totals: []
        };
	};

	componentWillMount() {
		const totals = getRecipesByCategoryTotals();
		this.setState({ totals })
	}

	componentDidMount() {
		console.log(this.state);
		if (this.state.loading && this.props.categories.length > 0) {
			this.setState({ loading: false });
		}
	}

	componentDidUpdate() {
		console.log(this.props);
		if (this.props.categories.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.categories.length > 0) {
			this.setState({ categories: this.props.categories });
			this.setState({ loading: false });
		}
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