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
        case 'SORT_BY_NAME_ASC':
            return {
                ...state,
            };
        default:
            return state;
    }
};