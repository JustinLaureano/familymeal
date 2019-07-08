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