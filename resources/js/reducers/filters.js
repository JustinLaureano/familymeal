const filterReducerDefaultState = {
    currentRecipe: null
};

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_RECIPE':
            return {
                ...state,
                currentRecipe: action.recipe
            };
        case 'CLEAR_CURRENT_RECIPE':
            return {
                ...state,
                currentRecipe: null
            };
        case 'SORT_BY_NAME_ASC':
            return {
                ...state,
            };
        default:
            return state;
    }
};