const totalsReducerDefaultState = {};

export default (state = totalsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_RECIPE_TOTAL':
            return {
                ...state,
                recipe: action.recipeTotal
            };
        default:
            return state;
    }
};