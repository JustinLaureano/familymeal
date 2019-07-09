import React from 'react';
import { connect } from 'react-redux';
import { getAverageRating } from '../../helpers/Recipe';

export class RecipeNotes extends React.Component {
	render() {
		return (
            <section className="recipe-grid__notes">
                <h2 className="recipe-grid__section-title">Notes</h2>
                {
                    this.props.notes.length > 0 ?
                    (
                        this.props.notes.map((note, index) => {
                            return (
                                <div
                                    key={"note_" + index}
                                    className="recipe-grid__note-row">
                                    <p className="recipe-grid__note-order">{ note.order }.</p>
                                    <p className="recipe-grid__note">{ note.note }</p>
                                </div>
                            )
                        })
                    ) :
                    (
                        <div
                            key={"note"}
                            className="recipe-grid__note-row">
                            <p className="recipe-grid__note--inactive">No notes for this recipe.</p>
                        </div>
                    )
                }
            </section>
		);
	};
};

const mapStateToProps = (state) => {
	return {
        recipeId: state.filters.currentRecipe.info.id,
        notes: state.filters.currentRecipe.notes
	}
};
  
export default connect(mapStateToProps)(RecipeNotes);
