const uploadsReducerDefaultState = {
    newRecipePhoto: null
};

export default (state = uploadsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_RECIPE_PHOTO_UPLOAD':
            return {
                ...state,
                newRecipePhoto: action.photo
            };
        default:
            return state;
    }
};