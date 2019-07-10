const cuisineTypesReducerDefaultState = [];

export default (state = cuisineTypesReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CUISINE_TYPES':
            return action.cuisine_types;
        default:
            return state;
    }
};