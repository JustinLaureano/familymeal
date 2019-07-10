const recipeCategoriesReducerDefaultState = [];

export default (state = recipeCategoriesReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_RECIPE_CATEGORIES':
            return action.recipe_categories;
        default:
            return state;
    }
};