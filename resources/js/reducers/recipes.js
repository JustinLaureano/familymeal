const recipeReducerDefaultState = [];

export default (state = recipeReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            return [
                ...state,
                action.recipe
            ];
        case 'SET_RECIPES':
            return action.recipes;
        case 'EDIT_RECIPE':
            return state.map((recipe) => {
                if (recipe.id === action.id) {
                    return {
                        ...recipe,
                        ...action.updates
                    };
                } else {
                    return recipe;
                };
            });
        case 'UPDATE_RECIPES_FAVORITE_STATUS_BY_RECIPE_ID':
            return state.map((recipe) => {
                if (recipe.id == action.recipe_id) {
                    return {
                        ...recipe,
                        favorite: action.favorite
                    };
                } else {
                    return recipe;
                };
            });
        case 'DELETE_RECIPE':
            return state.filter((recipe) => recipe.id != action.id);
        default:
            return state;
    }
};