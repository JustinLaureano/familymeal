export const init = (token, csrf_token, user_id) => {
	return (dispatch) => {
		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
		};

		fetch('/api/init/' + user_id, request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'SET_TOKEN',
					token
				});

				dispatch({
					type: 'SET_CSRF_TOKEN',
					csrf_token
				});

				dispatch({
					type: 'SET_USER',
					user: data.user
				});

				dispatch({
					type: 'SET_USER_SETTINGS',
					userSettings: data.user_settings
				});

				dispatch({
					type: 'SET_RECIPE_TOTAL',
					recipeTotal: data.recipe_total
				});

				dispatch({
					type: 'SET_RECIPE_CATEGORIES',
					recipe_categories: data.recipe_categories
				});

				dispatch({
					type: 'SET_INGREDIENT_CATEGORIES',
					ingredient_categories: data.ingredient_categories
				});

				dispatch({
					type: 'SET_INGREDIENT_SUBCATEGORIES',
					ingredient_subcategories: data.ingredient_subcategories
				});

				dispatch({
					type: 'SET_CUISINE_TYPES',
					cuisine_types: data.cuisine_types
				});
				
				dispatch({
					type: 'SET_RECIPES',
					recipes: data.recipes
				});

				dispatch({
					type: 'SET_MEASUREMENT_UNITS',
					measurement_units: data.measurement_units
				});

				dispatch({
					type: 'SET_INGREDIENTS',
					ingredients: data.ingredients
				});
				
				dispatch({
					type: 'SET_INGREDIENT_TOTAL',
					ingredientTotal: data.ingredient_total
				});
			})
			.catch(err => console.log(err))
	}
}

export const startLogout = () => {
    return (dispatch, getState) => {
		const token = getState().auth.token;
		
		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
		};

		fetch('/api/logout', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'LOGOUT'
				});
			})
			.catch(err => console.log(err))

    };
};
