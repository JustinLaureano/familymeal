import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageLoad from '../components/PageLoad';
import IngredientPageHeader from '../components/ingredient/IngredientPageHeader';
import IngredientInfo from '../components/ingredient/IngredientInfo';
import { setEditMode, startNewIngredient } from '../actions/filters';
import { getIngredient, clearCurrentIngredient } from '../actions/ingredients';

export class ViewIngredientPage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			loading: true,
			newIngredient: false
        };
	};
	componentWillMount() {
		if (this.props.location.pathname === '/ingredients/create') {
			this.setState(() => ({ newRecipe: true }));
		}

		this.setState(() => ({ loading: true }));
	}

	componentDidMount() {
		if (this.state.newIngredient) {
			this.props.startNewIngredient();
			this.setState(() => ({ loading: false }));
			this.props.setEditMode(true);
		}
		else {
			const ingredient_id = this.props.location.state.id;
			this.props.getIngredient(ingredient_id);
	
			// Set editMode if needed
			if (this.props.location.state && this.props.location.state.editMode) {
				this.props.setEditMode(true);
			}
		}
	}

	componentDidUpdate() {
		console.log(this.state, this.props);
		if (this.state.loading && this.props.ingredient.id) {
			this.setState(() => ({ loading: false }));
		}
	}

	componentWillUnmount() {
		this.props.setEditMode(false);
	}
	
	render() {
		if (this.state.loading) {
			return (
				<PageLoad />
			)
		}
		else {
			return (
				<section className="recipe-grid">
					<Breadcrumbs />
					<IngredientPageHeader />
					<IngredientInfo />
				</section>
			)
		}
	}
}

const mapStateToProps = (state) => ({
		editMode: state.filters.editMode,
		ingredient: state.filters.currentIngredient
});
  
const mapDispatchToProps = (dispatch, props) => ({
	clearCurrentIngredient: () => dispatch(clearCurrentIngredient()),
	getIngredient: (ingredient_id) => dispatch(getIngredient(ingredient_id)),
	setEditMode: (editMode) => dispatch(setEditMode(editMode)),
	startNewIngredient: () => dispatch(startNewIngredient())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewIngredientPage);