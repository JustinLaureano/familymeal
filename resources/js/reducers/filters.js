const filterReducerDefaultState = {
    currentRecipe: null,
    editMode: false,
    cancelChanges: false
};

const currentRecipeDefaultState = {
    info: {
        id: null,
        name: '',
        user_id: null,
        recipe_category_id: '',
        recipe_category_name: '',
        cuisine_type_id: '',
        cuisine_type: '',
        difficulty: 'Easy',
        portions: '',
        prep_time: '',
        cook_time: '',
        created_at: null,
        favorite: 'false'
    },
    photo: null,
    summary: {
        id: null,
        recipe_id: null,
        summary: ''
    },
    ratings: [],
    ingredients: [],
    directions: [],
    notes: []
}

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CANCEL_CHANGES_FILTER':
            return {
                ...state,
                cancelChanges: true
            };
        case 'RESET_CANCEL_CHANGES_FILTER':
            return {
                ...state,
                cancelChanges: false
            };
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
        case 'ADD_CURRENT_RECIPE_DIRECTION':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    directions: [
                        ...state.currentRecipe.directions,
                        action.direction
                    ]
                }
            };
        case 'ADD_CURRENT_RECIPE_INGREDIENT':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    ingredients: [
                        ...state.currentRecipe.ingredients,
                        action.ingredient
                    ]
                }
            };
        case 'ADD_CURRENT_RECIPE_NOTE':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    notes: [
                        ...state.currentRecipe.notes,
                        action.note
                    ]
                }
            };
        case 'SET_NEW_CURRENT_RECIPE':
            return {
                ...state,
                currentRecipe: currentRecipeDefaultState
            }
        case 'UPDATE_CURRENT_RECIPE_DIRECTIONS':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    directions: action.directions
                }
            };
        case 'UPDATE_CURRENT_RECIPE_INGREDIENTS':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    ingredients: action.ingredients
                }
            };
        case 'UPDATE_CURRENT_RECIPE_NOTES':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    notes: action.notes
                }
            };
        case 'UPDATE_CURRENT_RECIPE_PHOTO':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    photo: action.photo
                }
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
        case 'UPDATE_CURRENT_RECIPE_CATEGORY':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        recipe_category_id: action.category.id,
                        recipe_category_name: action.category.name
                    }
                }
            };
        case 'UPDATE_CURRENT_RECIPE_COOK_TIME':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        cook_time: action.cook_time
                    }
                }
            };
        case 'UPDATE_CURRENT_RECIPE_DIFFICULTY':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        difficulty: action.difficulty
                    }
                }
            };
        case 'UPDATE_CURRENT_RECIPE_PORTIONS':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        portions: action.portions
                    }
                }
            };
        case 'UPDATE_CURRENT_RECIPE_PREP_TIME':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        prep_time: action.prep_time
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
        case 'UPDATE_CURRENT_RECIPE_FAVORITE_STATUS':
            return {
                ...state,
                currentRecipe: {
                    ...state.currentRecipe,
                    info: {
                        ...state.currentRecipe.info,
                        favorite: action.favorite
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