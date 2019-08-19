import React from 'react';
import RecipePageSearch from '../components/recipe/RecipePageSearch';
import IngredientPageSearch from '../components/ingredient/IngredientPageSearch';

export class PageSearch extends React.Component {
	render() {
        switch(this.props.type) {
            case 'recipe':
                return (
                    <RecipePageSearch />
                )
            case 'favorite':
                return (
                    <RecipePageSearch favorites={ true } />
                )

            case 'ingredient':
                return (
                    <IngredientPageSearch />
                )
                
            default:
                return '';
        }
	};
};
  
export default PageSearch;
