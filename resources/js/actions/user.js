export const startSetUser = (uid) => {
    return (dispatch) => {
        fetch('/api/user/' + uid, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(user => {
            dispatch(setUser(user));
        });
    };
};

export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const setUserDashboard = () => {
    return (dispatch, getState) => {
        const uid = getState().user.id;
        const token = getState().auth.token;

        fetch('/api/dashboard/' + uid, {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: 'SET_RECIPES', recipes: data.recipes});
        });
    };
}