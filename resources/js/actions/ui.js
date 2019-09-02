export const toggleSidebarOpen = (sidebarOpen) => {
	return (dispatch) => {
        dispatch({
            type: 'TOGGLE_SIDEBAR_OPEN',
            sidebarOpen
        });
	}
}