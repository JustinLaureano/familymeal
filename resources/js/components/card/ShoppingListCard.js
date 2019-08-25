import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { arrayMove } from '../../services/Recipe';

export class ShoppingListCard extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
            items: this.props.items,
            loading: true,
            edited: false,
            titleEdit: false
        };

        this.newIdFloor = 900000;
        this.newIdCeiling = 999999;
    };
    
    componentDidMount() {
		if (this.state.loading && this.props.hasOwnProperty('items') && this.props.items.length > 0) {
			this.setState({ loading: false });
		}
    }
    
    componentDidUpdate() {
        if (this.state.loading && this.props.hasOwnProperty('items') && this.props.items.length > 0) {
			this.setState({ loading: false });
        }
        
        if (this.state.edited) {
            console.log('edited');
            console.log(this.state.items);

        }
    }

    getShoppingListRows = () => {
        return document
            .querySelector('#shopping-list-body_' + this.props.id)
            .querySelectorAll('.list__list-item-row');
    }

    onDrag = (e, id) => {
        document.body.style.cursor = 'move';

        const dropPos = e.clientY;
        const shoppingList = this.getShoppingListRows();
        let newIndex = null;

        // determine where to drop
        for (let i = 0; i < shoppingList.length; i++) {
            const top = shoppingList[i].getBoundingClientRect().top;
            const height = shoppingList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof shoppingList[i + 1] == 'undefined' ?
                bottom : shoppingList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
                break;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == shoppingList.length) {
                // last element
                newIndex = i;
            }
        }

        if (newIndex != null) {
            [...shoppingList].map((item, index) => {
                if (index == newIndex) {
                    item.style.marginTop = (shoppingList[newIndex].getBoundingClientRect().height * .15) + 'px';
                    item.style.borderTop = '2px solid #505d6a';

                }
                else {
                    item.style.marginTop = 0;
                    item.style.borderTop = 'none';
                    item.style.borderBottom = 'none';
                }

            });
        }
    }

    onDragEnd = (e) => {
        document.body.style.cursor = 'auto';
        const shoppingList = document.querySelectorAll('.list__list-item-row');
        [...shoppingList].map(item => {
            item.style.marginTop = 0;
            item.style.borderTop = 'none';
            item.style.borderBottom = 'none';
        });
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    }

    onDrop = (e) => {
        const dropPos = e.clientY;
        const id = e.dataTransfer.getData('id');
        const shoppingList = this.getShoppingListRows();
        let newIndex = null;

        // determine where to drop
        for (let i = 0; i < shoppingList.length; i++) {

            const top = shoppingList[i].getBoundingClientRect().top;
            const height = shoppingList[i].getBoundingClientRect().height;
            const bottom = top + height;

            let nextBottom = typeof shoppingList[i + 1] == 'undefined' ?
                bottom : shoppingList[i + 1].getBoundingClientRect().bottom;

            if (i === 0 && dropPos < (top + (height / 2))) {
                // first element
                newIndex = i;
            }
            else if (dropPos < top && dropPos < nextBottom) {
                newIndex = i - 1;
                break;
            }
            else if (dropPos > top && i + 1 == shoppingList.length) {
                // last element
                newIndex = i;
            }
        }

        if (newIndex != null) {
            let currentIndex = null;
            this.state.items.map((item, index) => {
                if (item.id == id) {
                    currentIndex = index;
                }
            });

            this.setState(() => ({
                items: arrayMove(this.state.items, currentIndex, newIndex),
                edited: true
            }));
        }
    }

    removeListItem = (e) => {
        const id = e.target.id.replace(/\D/g, '');
        const filteredListItems = this.state.items.filter(item => item.id != id);
        // this.props.removeCurrentRecipeIngredient(filteredIngredients);
        this.setState(() => ({ edited: true }));
    }

    toggleListItemRemoveConfirm = (e) => {
        const removeContainer = document.getElementById('list-item-remove_' + e.target.id.replace(/\D/g, ''));
        if (removeContainer.classList.contains('display--none')) {
            removeContainer.classList.remove('display--none');
        }
        else {
            removeContainer.classList.add('display--none');
        }
    }

	render() {
        return this.state.loading ? (
            <section className="list__area">
                <div id={ "shopping-list_" + this.props.id } className="list">
                    <div className="list__body">
                        <div className="loading__circle"></div>
                    </div>
                </div>
            </section>
            ) : (
            <section className="list__area">
                <div id={ "shopping-list_" + this.props.id } className="list">
                    <div className="list__header">
                        <h4>{ this.props.name }</h4>
                    </div>
                    <div 
                        id={ "shopping-list-body_" + this.props.id }
                        className="list__body"
                        onDragOver={ this.onDragOver }>
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <div 
                                    key={"shopping-list-item_" + item.id}
                                    id={ "shopping-list-item_" + item.id }
                                    className="list__list-item-row"
                                    draggable
                                    onDragStart={(e) => this.onDragStart(e, item.id) }
                                    onDrag={ (e) => this.onDrag(e, item.id) }
                                    onDragEnd={ this.onDragEnd }
                                    onDrop={ this.onDrop }>

                                    <i className="material-icons drag-icon">drag_indicator</i>

                                    <Link
                                        to={{
                                            pathname: "/ingredients/" + item.ingredient_id,
                                            state: {
                                            id: item.ingredient_id
                                            }
                                        }}
                                        className="list__item-link">
                                        { item.ingredient_name }
                                    </Link>

                                    <div className="list__item-remove">
                                        <i
                                            id={ "remove_" + item.id }
                                            className="material-icons remove-icon"
                                            onClick={ this.toggleListItemRemoveConfirm }>remove_circle
                                        </i>
                                    </div>

                                    <section
                                    id={ "list-item-remove_" + item.id }
                                    className="list__item-confirmation confirmation display--none">
                                        <p className="confirmation__label">Remove Item?</p>
                                        <button
                                            id={ "list-item-remove-btn_" + item.id }
                                            className="btn--confirmation-confirm"
                                            onClick={ this.removeListItem }>
                                            Remove
                                        </button>
                                        <button
                                            id={ "confirmation-cancel-btn_" + item.id }
                                            className="btn--confirmation"
                                            onClick={ this.toggleListItemRemoveConfirm }>
                                            Cancel
                                        </button>
                                    </section>

                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="list__footer"></div>
                </div>
            </section>
        )
	}
}

export default ShoppingListCard;