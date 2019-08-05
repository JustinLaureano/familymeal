export const getFavoriteRecipes = () => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const user_id = getState().user.id;

		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			}
		};

		fetch('/api/favorite-recipes/' + user_id, request)
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