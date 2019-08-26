import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { arrayMove } from '../../services/Recipe';
import { updateShoppingListItems, updateShoppingListName } from '../../actions/shoppingList';

export class ShoppingListCard extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
            name: this.props.name,
            items: this.props.items,
            loading: true,
            itemEdited: false,
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
        
        if (this.state.itemEdited) {
            this.props.updateShoppingListItems(this.props.id, this.state.items);
            this.setState({ itemEdited: false });
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

    onDragOver = (e) => e.preventDefault();

    onDragStart = (e, id) => e.dataTransfer.setData('id', id);

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
                itemEdited: true
            }));
        }
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    }

    removeListItem = (e) => {
        const id = e.target.id.replace(/\D/g, '');
        const filteredListItems = this.state.items.filter(item => item.id != id);
        this.setState(() => ({ items: filteredListItems, itemEdited: true }));
    }

    toggleCheckbox = (e) => {
        const shoppingListItemId = e.target.id.replace(/\D/g, '');

        // check hidden input box
        const checkedStatus = document.querySelector('input[name="input-checked_' + shoppingListItemId + '"]').checked;
        document.querySelector('input[name="input-checked_' + shoppingListItemId + '"]').checked = !checkedStatus;
        const items = this.state.items.map(item => {
            if (item.id != shoppingListItemId) {
                return item;
            }
            const newCheckedStatus = checkedStatus ? 0 : 1;
            return { ...item, checked: newCheckedStatus };
        })

        this.setState(() => ({ items, itemEdited: true }))

        // update list item
        // this.props.updateShoppingListItemCheckedStatus(this.props.id, shoppingListItemId, !checkedStatus);
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

    setTitleEdit = () => this.setState(() => ({ titleEdit: true }));

    stopTitleEdit = () => {
        if (this.state.name !== this.props.name) {
            this.props.updateShoppingListName(this.props.id, this.state.name);
        }

        this.setState(() => ({ titleEdit: false }));
    };

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
                        <input 
                            type="text"
                            name={ "list-name_" + this.props.id }
                            className={ this.state.titleEdit ? "list__name--edit" : "list__name" }
                            onFocus={ this.setTitleEdit }
                            onBlur={ this.stopTitleEdit }
                            onChange={ this.onNameChange }
                            value={ this.state.name } />
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

                                    <div className="input__checkbox">
                                        <i
                                            id={ "list-item-checked_" + item.id }
                                            className={ "material-icons checked-icon" + (parseInt(item.checked) === 1 ? '--checked' : '') }
                                            onClick={ this.toggleCheckbox }>
                                            { parseInt(item.checked) === 1 ? 'check_circle' : 'radio_button_unchecked' }
                                        </i>
                                        <input
                                            type="checkbox"
                                            name={ "input-checked_" + item.id }
                                            value={ item.checked }
                                            defaultChecked={ parseInt(item.checked) === 1 ? 'checked' : '' }
                                            className="input__checkbox-input"/>
                                    </div>

                                    <Link
                                        to={{
                                            pathname: "/ingredients/" + item.ingredient_id,
                                            state: {
                                            id: item.ingredient_id
                                            }
                                        }}
                                        className={ "list__item-link" + (parseInt(item.checked) === 1 ? ' line-through' : '') }>
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

const mapDispatchToProps = (dispatch, props) => ({
	updateShoppingListItems: (shopping_list_id, items) => dispatch(updateShoppingListItems(shopping_list_id, items)),
	updateShoppingListName: (shopping_list_id, name) => dispatch(updateShoppingListName(shopping_list_id, name))
});
  
export default connect(undefined, mapDispatchToProps)(ShoppingListCard);