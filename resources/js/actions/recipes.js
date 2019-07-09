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
					recipeId: data.recipe.info.id
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
			})
			.catch(err => console.log(err))
	}
}
