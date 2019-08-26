import React from 'react';

export class AddShoppingListCard extends React.Component {
	render() {
        return (
            <section className="list__area">
                <div id="shopping-list_add" className="list">
                    <div className="list__add-area">
                        <p className="list__add-text">Create a new Shopping List</p>
                        <button 
                            onClick={ this.props.onAddNewShoppingList } 
                            className="btn--secondary">
                            <i className="material-icons">add</i>
                            Create
                        </button>
                    </div>
                </div>
            </section>
        )
	}
}

export default AddShoppingListCard;