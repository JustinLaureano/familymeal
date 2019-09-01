const ingredientsReducerDefaultState = [];

export default (state = ingredientsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_INGREDIENTS':
            return action.ingredients;
        case 'DELETE_INGREDIENT':
            return state.filter((ingredient) => ingredient.id != action.id);
        default:
            return state;
    }
};