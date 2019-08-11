const toastReducerDefaultState = { messages: [] };

export default (state = toastReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TOAST_MESSAGES':
            return {
                ...state,
                messages: action.messages
            };
        case 'CLEAR_TOAST_MESSAGES':
            return {
                ...state,
                messages: []
            };
        default:
            return state;
    }
};