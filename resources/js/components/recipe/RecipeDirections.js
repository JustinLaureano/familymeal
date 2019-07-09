import React from 'react';
import { connect } from 'react-redux';

export class RecipeDirections extends React.Component {
	render() {
		return (
            <section className="recipe-grid__directions">
                {this.props.directions.map(direction => {
                    return (
                        <p>{ direction.order }</p>
                    )
                })}
            </section>
		);
	};
};

const mapStateToProps = (state) => {
	return {
        recipeId: state.filters.currentRecipe.info.id,
        directions: state.filters.currentRecipe.directions
	}
};
  
export default connect(mapStateToProps)(RecipeDirections);
