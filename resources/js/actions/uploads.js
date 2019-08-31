export const newRecipePhoto = (photo) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_RECIPE_PHOTO_UPLOAD',
			photo
		});
	}
}