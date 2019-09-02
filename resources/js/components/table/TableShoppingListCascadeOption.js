import React from 'react';
import { connect } from 'react-redux';

export class TableShoppingListCascadeOption extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dropdownOpen: false
        };
    };
    
    toggleDropdown = () => this.setState(() => ({ dropdownOpen: !this.state.dropdownOpen }));

    onRemoveItem = (e) => {
        const shopping_list_id = e.currentTarget.id.replace(/\D/g, '');
        const ingredient_id = e.currentTarget.parentNode.id.replace(/\D/g, '');
        const shopping_lists = this.props.shopping_lists;

        for (let i = 0; i < shopping_lists.length; i++) {
            if (shopping_lists[i].id == shopping_list_id) {
                const items = shopping_lists[i].items;
                for (let j = 0; j < items.length; j++) {
                    if (items[j].ingredient_id == ingredient_id) {
                        this.props.onRemoveItem(items[j].id);
                        break;
                    }
                }
            }
        }
    }

    onAddItem = (e) => {
        const shopping_list_id = e.currentTarget.id.replace(/\D/g, '');
        const ingredient_id = e.currentTarget.parentNode.id.replace(/\D/g, '');
        this.props.onAddItem(shopping_list_id, ingredient_id);
    }

	render() {
        const option = this.props.option;
        const id = this.props.id;
        return (
            <div
                key={"option_" + option.label + "_" + id}
                className="table__more-option--cascade">

                <div className={ "table__more-options-cascade-btn" + (this.state.dropdownOpen ? '--open' : '' )}>
                    <i className="material-icons table__more-option-icon">{ option.icon }</i>
                    
                    <span className="table__more-options-cascade-label">{ option.label }</span>
                    <div className="table__more-option-icon-box" onClick={ this.toggleDropdown }>
                        <i className="material-icons table__more-option-icon">{ this.state.dropdownOpen ? "arrow_drop_up" : "arrow_drop_down" }</i>
                    </div>
                </div>

                <div
                    id={ "table__more-option-dropdown-ingredient_" + id }
                    className={ "table__more-option-dropdown" + (this.state.dropdownOpen ? '' : ' display--none' )}>
                    {
                        this.props.dropdownOptions.map(option => {
                            let isShoppingListItem = false;
                            this.props.shopping_lists.map(list => {
                                if (list.id == option.id) {
                                    for (let i = 0; i < list.items.length; i++) {
                                        if (list.items[i].ingredient_id == id) {
                                            isShoppingListItem = true;
                                            break;
                                        }
                                    }
                                }
                            })
                            return (
                                <div 
                                    key={ "dropdown-option_" + id + '_' + option.id }
                                    id={ "dropdown-option_" + option.id }
                                    className="table__more-dropdown-option"
                                    onClick={ isShoppingListItem ? this.onRemoveItem : this.onAddItem } >
                                    <i className="material-icons table__more-option-icon">{ isShoppingListItem ? 'remove_circle' : 'add_circle' }</i>
                                    <span>{ (isShoppingListItem ? 'Remove from ' : 'Add to ') + option.label }</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
	}
}

const mapStateToProps = (state) => ({
	shopping_lists: state.shopping_lists
});

export default connect(mapStateToProps)(TableShoppingListCascadeOption);