const ingredientSubcategoriesReducerDefaultState = [];

export default (state = ingredientSubcategoriesReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_INGREDIENT_SUBCATEGORIES':
            return action.ingredient_subcategories;
        default:
            return state;
    }
};