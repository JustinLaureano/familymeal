import React from 'react';
import { connect } from 'react-redux';
import { setRecipeCardView, setRecipeTableView } from '../../actions/ui';

export class RecipeViewStyle extends React.Component {
	render() {
		return (
            <div className="toggle-btns">
                <button
                    className={ "btn btn__toggle-btn" + ( this.props.recipeView === 'table' ? '--active' : '' ) }
                    onClick={ this.props.setRecipeTableView }>
                    <i className="material-icons">list</i>
                </button>
                <button
                    className={ "btn btn__toggle-btn" + ( this.props.recipeView === 'card' ? '--active' : '' ) }
                    onClick={ this.props.setRecipeCardView }>
                    <i className="material-icons">view_module</i>
                </button>
            </div>
		);
	};
};

const mapStateToProps = (state) => ({
    recipeView: state.ui.recipeView
});

const mapDispatchToProps = (dispatch) => ({
    setRecipeCardView: () => dispatch(setRecipeCardView()),
    setRecipeTableView: () => dispatch(setRecipeTableView())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeViewStyle);
