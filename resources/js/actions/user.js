export const setUser = (user_id) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        const user = getState().user;
        
        if (typeof user !== 'undefined' && user.id == user_id) {
            dispatch({
                type: 'SET_USER',
                user
            });
        }
        else {
            fetch('/api/user/' + user_id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(resp => resp.json())
            .then(user => {
                dispatch({
                    type: 'SET_USER',
                    user
                });
            });
        }
    };
};
