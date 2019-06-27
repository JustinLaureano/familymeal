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
					dispatch(login(data.token));
					dispatch({type: 'SET_USER', user: data.user});
				}
			})
			.catch(err => console.log(err))
	}
};

export const login = (token) => ({
	type: 'LOGIN',
	token
});


export const startLogout = () => {
    return () => {
        return '';
    };
};

export const logout = () => ({
	type: 'LOGOUT'
});