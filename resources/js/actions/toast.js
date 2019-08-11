export const setToastMessages = (messages) => {
	return (dispatch) => {
        dispatch({
            type: 'SET_TOAST_MESSAGES',
            messages
        });
	}
}

export const clearToastMessages = () => {
	return (dispatch) => {
        dispatch({
            type: 'CLEAR_TOAST_MESSAGES'
        });
	}
}