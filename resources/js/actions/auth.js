export const setToken = (token) => {
	return (dispatch) => {
		dispatch({
			type: 'SET_TOKEN',
			token
		});
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

export const getData = () => {
    return (dispatch, getState) => {
		const token = getState().auth.token;
		
		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
		};

		fetch('/api/data', request)
			.then(resp => resp.json())
			.then((data) => {
				console.log(data);
				dispatch({
					type: 'SET_DATA',
					data
				});
			})
			.catch(err => console.log(err))

    };
};