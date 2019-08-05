const totalsReducerDefaultState = {};

export default (state = totalsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_RECIPE_TOTAL':
            return {
                ...state,
                recipe: action.recipeTotal
            };
        case 'SET_FAVORITE_RECIPE_TOTAL':
            return {
                ...state,
                favorite_recipe: action.recipeTotal
            };
        default:
            return state;
    }
};