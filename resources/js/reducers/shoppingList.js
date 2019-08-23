const shoppingListReducerDefaultState = [];

export default (state = shoppingListReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_SHOPPING_LISTS':
            return action.shopping_lists;
        default:
            return state;
    }
};