import React from 'react';
import { connect } from 'react-redux';

export class RecipeDirections extends React.Component {
	render() {
		return (
            <section className="recipe-grid__directions">
                <h2 className="recipe-grid__section-title">Directions</h2>
                
                {this.props.directions.map((direction, index) => {
                    return (
                        <div 
                            key={"direction_" + direction.id}
                            className="recipe-grid__direction-row">
                            <p className="recipe-grid__direction-order">{ direction.order }.</p>
                            <p className="recipe-grid__direction">
                                { direction.direction }
                            </p>
                        </div>
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
