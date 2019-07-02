export const startLogin = (email, password) => {
	return (dispatch) => {
		const request = {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email, password})
		};

		fetch('/api/login', request)
			.then(resp => resp.json())
			.then((data) => {
				if (data.token) {
					dispatch({type: 'SET_USER', user: data.user});
					dispatch(login(data.token));
				}
			})
			.catch(err => console.log(err))
	}
};

export const setToken = (token) => {
	return (dispatch) => {
		dispatch(login(token));
	}
}

export const login = (token) => ({
	type: 'LOGIN',
	token
});


export const startLogout = () => {
    return (dispatch, getState) => {
		const token = getState().auth.token;
		
		const request = {
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
				dispatch(logout());
			})
			.catch(err => console.log(err))

    };
};

export const logout = () => ({
	type: 'LOGOUT'
});