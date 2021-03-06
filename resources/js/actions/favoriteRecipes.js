export const getFavoriteRecipes = (user_id = null, page = 1) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		if (!user_id) {
			user_id = getState().user.id;
		}
		
		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			}
		};

		fetch('/api/favorite-recipes/' + user_id + '?page=' + page, request)
			.then(resp => resp.json())
			.then((data) => {
                dispatch({
                    type: 'SET_FAVORITE_RECIPES',
                    recipes: data.recipes
                });

                dispatch({
                    type: 'SET_FAVORITE_RECIPE_TOTAL',
                    recipeTotal: data.recipe_total
                });
			})
			.catch(err => console.log(err))
	}
}

export const clearFavoriteRecipes = () => {
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_FAVORITE_RECIPES'
		});
	}
}