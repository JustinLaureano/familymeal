import React from 'react';
import RecipePageSearch from '../components/recipe/RecipePageSearch';

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
            default:
                return '';
        }
	};
};
  
export default PageSearch;
