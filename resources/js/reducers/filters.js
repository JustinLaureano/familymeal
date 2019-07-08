const filterReducerDefaultState = {
};

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SORT_BY_NAME_ASC':
            return {
                ...state,
            };
        default:
            return state;
    }
};