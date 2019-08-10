export const changeTablePage = (pageNumber, model) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        const user_id = getState().user.id;
        let url = '';

        const request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        switch (model) {
            case 'recipe':
				url = '/api/recipes/'+ user_id +'/?page=' + pageNumber;
				break;
			case 'favorite-recipes':
				url = '/api/favorite-recipes/'+ user_id +'/?page=' + pageNumber;
				break;
        }

		fetch(url, request)
			.then(resp => resp.json())
			.then((data) => {
                console.log(data)
                switch (model) {
                    case 'recipe':
                        dispatch({
                        	type: 'SET_RECIPES',
                        	recipes: data.recipes
                        });
						break;
					case 'favorite-recipes':
                        dispatch({
                        	type: 'SET_FAVORITE_RECIPES',
                        	recipes: data.recipes
                        });
                        break;
                }
			})
			.catch(err => console.log(err))
	}
};

export const setEditMode = (editMode) => {
	// editMode boolean value
	return (dispatch) => {
		dispatch({
			type: 'SET_EDIT_MODE',
			editMode
		});
	}
}

export const addCurrentRecipeIngredient = (ingredient) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_CURRENT_RECIPE_INGREDIENT',
			ingredient
		});
	}
}

export const removeCurrentRecipeIngredient = (ingredients) => {
	return (dispatch) => {
        dispatch({
            type: 'UPDATE_CURRENT_RECIPE_INGREDIENTS',
            ingredients
        });
	}
}

export const addCurrentRecipeDirection = (direction) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_CURRENT_RECIPE_DIRECTION',
			direction
		});
	}
}

export const removeCurrentRecipeDirection = (directions) => {
	return (dispatch) => {
        dispatch({
            type: 'UPDATE_CURRENT_RECIPE_DIRECTIONS',
            directions
        });
	}
}

export const addCurrentRecipeNote = (note) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_CURRENT_RECIPE_NOTE',
			note
		});
	}
}

export const removeCurrentRecipeNote = (notes) => {
	return (dispatch) => {
        dispatch({
            type: 'UPDATE_CURRENT_RECIPE_NOTES',
            notes
        });
	}
}

export const setCancelChanges = () => {
	return (dispatch) => {
		dispatch({
			type: 'SET_CANCEL_CHANGES_FILTER'
		});
		return new Promise((resolve, reject) => resolve());
	}
}

export const resetCancelChanges = () => {
	return (dispatch) => {
        dispatch({
            type: 'RESET_CANCEL_CHANGES_FILTER'
        });
	}
}

export const getRecipeSearchResults = (params) => {
	return new Promise((resolve, reject) => {
		const token = params.token;
		const csrf_token = params.csrf_token;
		const user_id = params.user_id;
		const value = params.value.toString();

		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			}
		};

		const url = '/api/search/recipes?user_id=' + user_id + '&value=' + value;
		fetch(url, request)
			.then(resp => resp.json())
			.then((data) => {
				resolve(data);
			})
			.catch(err => reject(err))

	});
}