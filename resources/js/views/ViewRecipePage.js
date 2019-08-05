import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import RecipePageHeader from '../components/recipe/RecipePageHeader';
import PageLoad from '../components/PageLoad';
import RecipeAbout from '../components/recipe/RecipeAbout';
import RecipeInfo from '../components/recipe/RecipeInfo';
import RecipeIngredients from '../components/recipe/RecipeIngredients';
import RecipeDirections from '../components/recipe/RecipeDirections';
import RecipeNotes from '../components/recipe/RecipeNotes';
import RecipePhoto from '../components/recipe/RecipePhoto';
import { setEditMode } from '../actions/filters';
import { getRecipe, clearCurrentRecipe } from '../actions/recipes';

export class ViewRecipePage extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			loading: true
        };
	};
	componentWillMount() {
		this.setState(() => ({ loading: true }));
	}

	componentDidMount() {
		const recipe_id = this.props.location.state.id;
		this.props.getRecipe(recipe_id);
	}

	componentDidUpdate() {
		if (this.state.loading && this.props.recipe.info.id) {
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
			const pageHeaderProps = {
				title: this.props.recipe.info.name
			}
			return (
				<section className="recipe-grid">
					<Breadcrumbs />
					<RecipePhoto />
					<RecipePageHeader {...pageHeaderProps}/>
					<RecipeAbout />
					<RecipeInfo />
					<RecipeIngredients />
					<RecipeDirections />
					<RecipeNotes />
				</section>
			)
		}
	}
}

const mapStateToProps = (state) => ({
		editMode: state.filters.editMode,
		recipe: state.filters.currentRecipe
});
  
const mapDispatchToProps = (dispatch, props) => ({
	clearCurrentRecipe: () => dispatch(clearCurrentRecipe()),
	getRecipe: (recipe_id) => dispatch(getRecipe(recipe_id)),
	setEditMode: (editMode) => dispatch(setEditMode(editMode))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipePage);