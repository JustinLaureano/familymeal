import React from 'react';
import { connect } from 'react-redux';
import RecipeRatings from '../../components/recipe/RecipeRatings';
import RecipeSummary from '../../components/recipe/RecipeSummary';

export class RecipeAbout extends React.Component {
	render() {
		return (
            <section className="recipe-grid__about">
                <RecipeRatings />
                <RecipeSummary />
            </section>
		);
	};
};

export default RecipeAbout;
