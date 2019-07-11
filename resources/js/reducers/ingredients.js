const ingredientsReducerDefaultState = [];

export default (state = ingredientsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_INGREDIENTS':
            return action.ingredients;
        default:
            return state;
    }
};