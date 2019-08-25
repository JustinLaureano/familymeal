export const addNewShoppingListItem = (params) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;
		const shopping_list_id = params.shopping_list_id;
		const user_id = getState().user.id;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ add: params, user_id })
		};

		fetch('/api/shopping-list/' + shopping_list_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'ADD_SHOPPING_LIST_ITEM',
                    shopping_list_id,
                    item: data.response
				});
			})
			.catch(err => console.log(err))
	}
}
export const updateShoppingListItems = (shopping_list_id, items) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;

		const request = {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
			body: JSON.stringify({ items })
		};

		fetch('/api/shopping-list/' + shopping_list_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_SHOPPING_LIST_ITEMS',
                    shopping_list_id,
                    items: data.response
				});
			})
			.catch(err => console.log(err))
	}
}

export const updateShoppingListName = (shopping_list_id, name) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const csrf_token = getState().auth.csrf_token;

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

		fetch('/api/shopping-list/' + shopping_list_id + '/update', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_SHOPPING_LIST_NAME',
                    shopping_list_id,
                    name: data.response
				});
			})
			.catch(err => console.log(err))
	}
}