const ingredientCategoriesReducerDefaultState = [];

export default (state = ingredientCategoriesReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_INGREDIENT_CATEGORIES':
            return action.ingredient_categories;
        default:
            return state;
    }
};