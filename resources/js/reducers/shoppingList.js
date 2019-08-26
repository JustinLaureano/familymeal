const shoppingListReducerDefaultState = [];

export default (state = shoppingListReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_SHOPPING_LISTS':
            return action.shopping_lists;

        case 'ADD_SHOPPING_LIST_ITEM':
            return state.map(list => {
                if (list.id == action.shopping_list_id) {
                    return {
                        ...list,
                        items: [ ...list.items, action.item]
                    };
                }
                else {
                    return list;
                }
            });
        case 'UPDATE_SHOPPING_LIST_ITEMS':
                return state.map(list => {
                    if (list.id == action.shopping_list_id) {
                        return {
                            ...list,
                            items: action.items
                        };
                    }
                    else {
                        return list;
                    }
                });
        case 'UPDATE_SHOPPING_LIST_NAME':
                return state.map(list => {
                    if (list.id == action.shopping_list_id) {
                        return {
                            ...list,
                            name: action.name
                        };
                    }
                    else {
                        return list;
                    }
                });
        default:
            return state;
    }
};