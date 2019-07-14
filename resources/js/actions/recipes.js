export const getRecipe = (recipe_id) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
		};

		fetch('/api/recipe/' + recipe_id, request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'SET_CURRENT_RECIPE',
					recipe: data.recipe
				});
			})
			.catch(err => console.log(err))
	}
}

export const clearCurrentRecipe = () => {
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_CURRENT_RECIPE'
		});
	}
}

export const updateRecipeName = (name) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const recipe_id = getState().filters.currentRecipe.info.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ name })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {

				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_NAME',
					name
				});

				// Update Recipe List with name change
				let changed = false;
				const recipes = getState().recipes.map((recipe) => {
					if (recipe.id == recipe_id) {
						recipe.name = name;
						changed = true;
					}
					return recipe;
				});

				if (changed) {
					dispatch({
						type: 'SET_RECIPES',
						recipes
					});
				}

			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeRating = (rating) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const recipe_id = getState().filters.currentRecipe.info.id;
		const user_id = getState().user.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ rating, user_id })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				const ratings = getState().filters.currentRecipe.ratings.map((r) => {
					if (r.user_id == user_id) {
						r.rating = rating;
					}
					return r;
				});

				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_RATINGS',
					ratings
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeSummary = (summary) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const recipe_id = getState().filters.currentRecipe.info.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ summary })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				console.log(data);
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_SUMMARY',
					summary
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeCuisine = (cuisine) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const recipe_id = getState().filters.currentRecipe.info.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ cuisine: cuisine.id })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				console.log(data);
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_CUISINE',
					cuisine
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeCategory = (category) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const recipe_id = getState().filters.currentRecipe.info.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ category: category.id })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				console.log(data);
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_CATEGORY',
					category
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeIngredients = (ingredients) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const recipe_id = getState().filters.currentRecipe.info.id;
		const user_id = getState().user.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ ingredients, user_id })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				console.log(data);
				// dispatch({
				// 	type: 'UPDATE_CURRENT_RECIPE_INGREDIENTS',
				// 	ingredients: data.response
				// });
			})
			.catch(err => console.log(err))
	}
}

export const deleteRecipe = (id) => {
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

		fetch('/api/recipes/' + id + '/delete', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'DELETE_RECIPE',
					id
				});
			})
			.catch(err => console.log(err))
	}
}
