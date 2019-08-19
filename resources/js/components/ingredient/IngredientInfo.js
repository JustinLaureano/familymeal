import React from 'react';
import IngredientCategory from '../../components/ingredient/IngredientCategory';
import IngredientSubcategory from '../../components/ingredient/IngredientSubcategory';

export class IngredientInfo extends React.Component {
	render() {
		return (
            <section className="recipe-grid__info">
				<IngredientCategory />
				{/* <IngredientSubcategory /> */}
            </section>
		);
	};
};
  
export default IngredientInfo;
