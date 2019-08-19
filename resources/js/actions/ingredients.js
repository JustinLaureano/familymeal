export const getIngredient = (ingredient_id) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
		};

		fetch('/api/ingredient/' + ingredient_id, request)
			.then(resp => resp.json())
			.then((ingredient) => {
				dispatch({
					type: 'SET_CURRENT_INGREDIENT',
					ingredient
				});
			})
			.catch(err => console.log(err))
	}
}

export const createNewIngredient = (ingredient) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const user_id = getState().user.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ user_id, ingredient })
		};

		fetch('/api/ingredients/store', request)
			.then(resp => resp.json())
			.then((data) => {

				dispatch({
					type: 'SET_CURRENT_INGREDIENT',
					ingredient: data.ingredient
				});

				// Update Recipe Table
				changeTablePage(1, 'ingredient');

				dispatch({
					type: 'SET_INGREDIENT_TOTAL',
					ingredientTotal: data.ingredient_total
				});

				dispatch({
					type: 'SET_EDIT_MODE',
					editMode: false
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateIngredient = (ingredient) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const ingredient_id = getState().filters.currentIngredient.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ ingredient })
		};

		fetch('/api/ingredients/' + ingredient_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {

				dispatch({
					type: 'UPDATE_CURRENT_INGREDIENT',
					ingredient: data.ingredient
				});

				// Update Recipe List with name change
				let changed = false;
				const ingredients = getState().ingredients.map((ingredient) => {
					if (ingredient.id == ingredient_id) {
						ingredient.name = name;
						changed = true;
					}
					return ingredient;
				});

				if (changed) {
					dispatch({
						type: 'SET_INGREDIENTS',
						ingredients
					});
				}

			})
			.catch(err => console.log(err))
	}
}

export const clearCurrentIngredient = () => {
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_CURRENT_INGREDIENT'
		});
	}
}

export const deleteIngredient = (id) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: {
                '_method': 'DELETE'
            }
		};

		fetch('/api/ingredients/' + id + '/delete', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'DELETE_INGREDIENT',
					id
				});
			})
			.catch(err => console.log(err))
	}
}