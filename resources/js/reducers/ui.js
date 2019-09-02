const uiReducerDefaultState = {
    sidebarOpen: false,
    recipeView: 'table'
};

export default (state = uiReducerDefaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR_OPEN':
            return {
                ...state,
                sidebarOpen: action.sidebarOpen
            };
        case 'SET_RECIPE_TABLE_VIEW':
            return {
                ...state,
                recipeView: 'table'
            };
        case 'SET_RECIPE_CARD_VIEW':
            return {
                ...state,
                recipeView: 'card'
            };
        default:
            return state;
    }
};