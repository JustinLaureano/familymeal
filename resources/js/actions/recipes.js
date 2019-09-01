import { changeTablePage } from './filters';
import { setToastMessages } from './toast';

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
			.then((recipe) => {
				dispatch({
					type: 'SET_CURRENT_RECIPE',
					recipe
				});
			})
			.catch(err => console.log(err))
	}
}

export const createNewRecipe = (recipe) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const user_id = getState().user.id;
		const photo = getState().uploads.newRecipePhoto;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ user_id, recipe })
		};

		fetch('/api/recipes/store', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'SET_CURRENT_RECIPE',
					recipe: data.recipe
				});

				// Update Recipe Table
				dispatch(changeTablePage(1, 'recipe'));

				dispatch({
					type: 'SET_RECIPE_TOTAL',
					recipeTotal: data.recipe_total
				});

				dispatch({
					type: 'SET_EDIT_MODE',
					editMode: false
				});

				if (photo) {
					dispatch(updateRecipePhoto(photo.file));
				}
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

				if (data.updates.includes('photo_name')) {
					// Update Recipe Photo as well
					dispatch({
						type: 'UPDATE_CURRENT_RECIPE_PHOTO',
						photo: data.response
					});
				}

			})
			.catch(err => console.log(err))
	}
}

export const updateRecipePhoto = (photo) => {
	console.log(photo);
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const recipe_id = getState().filters.currentRecipe.info.id;

		const formData = new FormData();
		formData.append('photo', photo);

		const request = {
			method: 'POST',
            headers: {
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: formData
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_PHOTO',
					photo: data.response
				});
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
				let ratings = getState().filters.currentRecipe.ratings.map((r) => {
					if (r.user_id == user_id) {
						r.rating = rating;
					}
					return r;
				});

				if (ratings.length == 0) {
					ratings = [{
						id: data.response.id,
						recipe_id,
						user_id,
						rating: data.response.rating
					}];
				}

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
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_CUISINE',
					cuisine
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeDifficulty = (difficulty) => {
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
			body: JSON.stringify({ difficulty })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_DIFFICULTY',
					difficulty
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipePortions = (portions) => {
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
			body: JSON.stringify({ portions })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_PORTIONS',
					portions
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
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_CATEGORY',
					category
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeCookTime = (cook_time) => {
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
			body: JSON.stringify({ cook_time })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_COOK_TIME',
					cook_time
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
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_INGREDIENTS',
					ingredients: data.response
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeDirections = (directions) => {
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
			body: JSON.stringify({ directions, user_id })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_DIRECTIONS',
					directions: data.response
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipeNotes = (notes) => {
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
			body: JSON.stringify({ notes, user_id })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_NOTES',
					notes: data.response
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateRecipePrepTime = (prep_time) => {
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
			body: JSON.stringify({ prep_time })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_CURRENT_RECIPE_PREP_TIME',
					prep_time
				});
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

				// Update Recipe Table
				dispatch(changeTablePage(1, 'recipe'));

				dispatch(setToastMessages([data.name + ' Deleted Successfully.']));
			})
			.catch(err => console.log(err))
	}
}

export const favoriteRecipe = (recipe_id, favorite) => {
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
			body: JSON.stringify({ favorite, user_id })
		};

		fetch('/api/recipes/' + recipe_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				const newFavoriteStatus = favorite == 'true' ? 'false': 'true';

				dispatch({
					type: 'UPDATE_RECIPES_FAVORITE_STATUS_BY_RECIPE_ID',
					recipe_id,
					favorite: newFavoriteStatus
				});

				if (getState().filters.currentRecipe) {
					const currentRecipeId = getState().filters.currentRecipe.info.id;
					if (currentRecipeId == recipe_id) {
						dispatch({
							type: 'UPDATE_CURRENT_RECIPE_FAVORITE_STATUS',
							favorite: newFavoriteStatus
						});
					}
				}
			})
			.catch(err => console.log(err))
	}
}