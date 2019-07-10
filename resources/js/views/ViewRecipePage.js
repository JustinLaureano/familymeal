import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import RecipePageHeader from '../components/recipe/RecipePageHeader';
import PageLoad from '../components/PageLoad';
import Photo from '../components/Photo';
import RecipeAbout from '../components/recipe/RecipeAbout';
import RecipeInfo from '../components/recipe/RecipeInfo';
import RecipeIngredients from '../components/recipe/RecipeIngredients';
import RecipeDirections from '../components/recipe/RecipeDirections';
import RecipeNotes from '../components/recipe/RecipeNotes';
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
	
	render() {
		if (this.state.loading) {
			return (
				<PageLoad />
			)
		}
		else {
			const pageHeaderProps = {
				title: this.props.recipe.info.name,
				options: {
					buttons: [
						{
							onClick: 'edit',
							className: 'btn--minimal',
							icon: 'edit',
							label: {
								view: 'Edit Recipe',
								edit: 'Save Recipe'
							}
						}
					]
				}
			}
			const photoProps = {
				className: 'photo--circle photo--recipe',
				src: 'https://fillmurray.com/120/120'
			}
			return (
				<section className="recipe-grid">
					<Breadcrumbs />
					<Photo {...photoProps}/>
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

const mapStateToProps = (state) => {
	return {
		recipe: state.filters.currentRecipe
	}
};
  
const mapDispatchToProps = (dispatch, props) => ({
	clearCurrentRecipe: () => dispatch(clearCurrentRecipe()),
	getRecipe: (recipe_id) => dispatch(getRecipe(recipe_id))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipePage);