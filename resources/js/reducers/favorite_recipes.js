const favoriteRecipesReducerDefaultState = [];

export default (state = favoriteRecipesReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FAVORITE_RECIPES':
            return action.recipes;
        default:
            return state;
    }
};