const uiReducerDefaultState = { sidebarOpen: false };

export default (state = uiReducerDefaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR_OPEN':
            return {
                ...state,
                sidebarOpen: action.sidebarOpen
            };
        default:
            return state;
    }
};