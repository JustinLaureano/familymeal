const filterReducerDefaultState = {
    currentRecipe: null,
    editMode: false
};

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_RECIPE':
            return {
                ...state,
                currentRecipe: action.recipe
            };
        case 'SET_EDIT_MODE':
            return {
                ...state,
                editMode: action.editMode
            };
        case 'CLEAR_CURRENT_RECIPE':
            return {
                ...state,
                currentRecipe: null
            };
        case 'UPDATE_CURRENT_RECIPE_RATINGS':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    ratings: action.ratings
                }
            };
        case 'UPDATE_CURRENT_RECIPE_SUMMARY':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    summary: {
                        ...state.currentRecipe.summary,
                        summary: action.summary
                    }
                }
            };
        case 'UPDATE_CURRENT_RECIPE_CUISINE':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        cuisine_type_id: action.cuisine.id,
                        cuisine_type: action.cuisine.name
                    }
                }
            };
        case 'UPDATE_CURRENT_RECIPE_NAME':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        name: action.name
                    }
                }
            };
        case 'SORT_BY_NAME_ASC':
            return {
                ...state,
            };
        default:
            return state;
    }
};