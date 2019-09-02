export const toggleSidebarOpen = (sidebarOpen) => {
	return (dispatch) => {
        dispatch({
            type: 'TOGGLE_SIDEBAR_OPEN',
            sidebarOpen
        });
	}
}

export const setRecipeCardView = () => (dispatch) => dispatch({ type: 'SET_RECIPE_CARD_VIEW' });

export const setRecipeTableView = () => (dispatch) => dispatch({ type: 'SET_RECIPE_TABLE_VIEW' });