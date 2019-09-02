import { setToastMessages } from './toast';

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
				if (data.error) {
					if (data.error == 'ingredient already exists') {
						dispatch(setToastMessages([data.error]));
					}
				}
				else {
					dispatch({
						type: 'ADD_SHOPPING_LIST_ITEM',
						shopping_list_id,
						item: data.response
					});
	
					const shoppingLists = getState().shopping_lists;
					let listName = null;
	
					shoppingLists.map(shoppingList => {
						if (shoppingList.id == shopping_list_id) {
							listName = shoppingList.name;
						}
					});
					const toastMessage = listName ? 
						data.response.ingredient_name + ' added to ' + listName + '.': 
						data.response.ingredient_name + ' added to shopping list.';
					dispatch(setToastMessages([toastMessage]));
				}
			})
			.catch(err => console.log(err))
	}
}

export const createNewShoppingList = () => {
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
			body: JSON.stringify({ user_id })
		};

		fetch('/api/shopping-list/store', request)
			.then(resp => resp.json())
			.then((data) => {
				if (data.error) {
					dispatch({
						type: 'ADD_TOAST_MESSAGE',
						message: data.error
					});
				}
				else {
					dispatch({
						type: 'SET_SHOPPING_LISTS',
						shopping_lists: data.shopping_lists
					});
				}
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

export const removeShoppingList = (shopping_list_id) => {
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

		fetch('/api/shopping-list/' + shopping_list_id + '/delete', request)
			.then(resp => resp.json())
			.then((data) => {
				dispatch({
					type: 'SET_SHOPPING_LISTS',
					shopping_lists: data.shopping_lists
				});
			})
			.catch(err => console.log(err))
	}
}

export const removeShoppingListItem = (shopping_list_item_id) => {
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
				'_method': 'DELETE',
            }
		};

		fetch('/api/shopping-list-item/' + shopping_list_item_id + '/delete', request)
			.then(resp => resp.json())
			.then((data) => {
				if (data.error) {
					if (data.error == 'item not in list') {
						dispatch(setToastMessages([data.error]));
					}
				}
				else {
					dispatch({
						type: 'SET_SHOPPING_LISTS',
						shopping_lists: data.shopping_lists
					});
					dispatch(setToastMessages([
						data.name + ' removed from ' + data.shopping_list_name + '.'
					]));
				}
			})
			.catch(err => console.log(err))
	}
}