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
					userSettings: data.userSettings
				});

				dispatch({
					type: 'SET_RECIPE_TOTAL',
					recipeTotal: data.recipeTotal
				});
				
				dispatch({
					type: 'SET_RECIPES',
					recipes: data.recipes
				});

				dispatch({
					type: 'SET_CUISINE_TYPES',
					cuisine_types: data.cuisine_types
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
				console.log(data);
				dispatch({
					type: 'LOGOUT'
				});
			})
			.catch(err => console.log(err))

    };
};
