import React from 'react';
import { connect } from 'react-redux';
import {  updateRecipeDirections } from '../../actions/recipes';
import { addCurrentRecipeDirection, removeCurrentRecipeDirection } from '../../actions/filters';
import { arrayMove } from '../../services/Recipe';
import DirectionInput from '../recipe/DirectionInput';

export class RecipeDirections extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            directions: this.props.directions,
            edited: false
        };

        this.newIdFloor = 900000;
        this.newIdCeiling = 999999;
    };

    addDirection = (direction) => {
        this.props.addCurrentRecipeDirection({
            id: Math.floor(Math.random() * (this.newIdCeiling - this.newIdFloor) + this.newIdFloor),
            order: this.state.directions.length + 1,
            direction: direction.direction
        });
        this.setState(() => ({ edited: true }));
    }

    componentDidUpdate() {
        if (!this.props.editMode) {
            this.saveRecipeDirections();
        }

        if (this.state.directions.length !== this.props.directions.length) {
            this.setState(() => ({ directions: this.props.directions }));
        }
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    }

    onDrag = (e, id) => {
        document.body.style.cursor = 'move';

        const dropPos = e.clientY;
        const directionList = document.querySelectorAll('.recipe-grid__direction-row--edit');
        let newIndex = null;

        // determine where to drop
        for (let i = 0; i < directionList.length; i++) {
            const top = directionList[i].getBoundingClientRect().top;
            const height = directionList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof directionList[i + 1] == 'undefined' ?
                bottom : directionList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
                break;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == directionList.length) {
                // last element
                newIndex = i;
            }
        }

        if (newIndex != null) {
            [...directionList].map((direction, index) => {
                if (index == newIndex) {
                    direction.style.marginTop = (directionList[newIndex].getBoundingClientRect().height * .15) + 'px';
                    direction.style.borderTop = '2px solid #505d6a';
                }
                else {
                    direction.style.marginTop = 0;
                    direction.style.borderTop = 'none';
                    direction.style.borderBottom = 'none';
                }
            });
        }
    }

    onDragEnd = (e) => {
        document.body.style.cursor = 'auto';
        const directionList = document.querySelectorAll('.recipe-grid__direction-row--edit');
        [...directionList].map(direction => {
            direction.style.marginTop = 0;
            direction.style.borderTop = 'none';
            direction.style.borderBottom = 'none';
        });
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e) => {
        const dropPos = e.clientY;
        const id = e.dataTransfer.getData('id');
        const directionList = document.querySelectorAll('.recipe-grid__direction-row--edit');
        let newIndex = null;
        // determine where to drop
        for (let i = 0; i < directionList.length; i++) {

            const top = directionList[i].getBoundingClientRect().top;
            const height = directionList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof directionList[i + 1] == 'undefined' ?
                bottom : directionList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
                break;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == directionList.length) {
                // last element
                newIndex = i;
            }
        }
       
        if (newIndex != null) {
            let currentIndex = null;
            this.state.directions.map((direction, index) => {
                if (direction.id == id) {
                    currentIndex = index;
                }
            });

            this.setState(() => ({
                directions: arrayMove(this.state.directions, currentIndex, newIndex),
                edited: true 
            }));
        }

    }

    saveRecipeDirections = () => {
        if (this.state.edited) {
            this.setState(() => ({ edited: false }));
            this.props.updateRecipeDirections(this.state.directions);
        }
    }

    toggleDirectionRemoveConfirm = (e) => {
        const removeContainer = document.getElementById('direction-remove_' + e.target.id.replace(/\D/g, ''));
        if (removeContainer.classList.contains('display--none')) {
            removeContainer.classList.remove('display--none');
        }
        else {
            removeContainer.classList.add('display--none');
        }
    }

    removeDirection = (e) => {
        const id = e.target.id.replace(/\D/g, '');
        const filteredDirections = this.state.directions.filter(direction => direction.id != id);
        this.props.removeCurrentRecipeDirection(filteredDirections);
        this.setState(() => ({ edited: true }));
    }

	render() {
        if (this.props.editMode) {
            return (
                <section className="recipe-grid__directions">
                    <h2 className="recipe-grid__section-title">Directions</h2>

                    <DirectionInput addDirection={ this.addDirection } />
                    
                    <section
                        className="recipe-grid__direction-list"
                        onDragOver={ this.onDragOver } >
                        {this.state.directions.map((direction, index) => {
                            return (
                                <div 
                                    key={ "direction_" + direction.id }
                                    id={ "direction_" + direction.id }
                                    className="recipe-grid__direction-row--edit"
                                    draggable
                                    onDragStart={(e) => this.onDragStart(e, direction.id) }
                                    onDrag={ (e) => this.onDrag(e, direction.id) }
                                    onDragEnd={ this.onDragEnd }
                                    onDrop={ this.onDrop }>

                                    <i className="material-icons drag-icon">drag_indicator</i>

                                    <p className="recipe-grid__direction-order">
                                        { index + 1 }.
                                    </p>
                                    <p className="recipe-grid__direction-direction">
                                        { direction.direction }
                                    </p>

                                    <div className="recipe-grid__remove">
                                        <i
                                            id={ "remove-direction_" + direction.id }
                                            className="material-icons remove-icon"
                                            onClick={ this.toggleDirectionRemoveConfirm }>remove_circle
                                        </i>
                                        <section
                                            id={ "direction-remove_" + direction.id }
                                            className="recipe-grid__confirmation confirmation display--none">
                                            <p className="confirmation__label">Remove Direction?</p>
                                            <button
                                                id={ "remove-btn_" + direction.id }
                                                className="btn--confirmation-confirm"
                                                onClick={ this.removeDirection }>
                                                Remove
                                            </button>
                                            <button
                                                id={ "confirmation-cancel-btn_" + direction.id }
                                                className="btn--confirmation"
                                                onClick={ this.toggleDirectionRemoveConfirm }>
                                                Cancel
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            )
                        })}
                    </section>

                </section>
            )
        }
        else {
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
        }
	};
};

const mapStateToProps = (state) => ({
    directions: state.filters.currentRecipe.directions,
    editMode: state.filters.editMode
});

const mapDispatchToProps = (dispatch, props) => ({
	addCurrentRecipeDirection: (direction) => dispatch(addCurrentRecipeDirection(direction)),
	removeCurrentRecipeDirection: (directions) => dispatch(removeCurrentRecipeDirection(directions)),
	updateRecipeDirections: (directions) => dispatch(updateRecipeDirections(directions)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDirections);
