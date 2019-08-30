export const changeTablePage = (pageNumber, model) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
		const user_id = getState().user.id;
		const recipeCategories = getState().filters.recipe_category;
		const cuisine_types = getState().filters.cuisine_type;
		const ingredientCategories = getState().filters.ingredient_category;
		const ingredientSubcategories = getState().filters.ingredient_subcategory;
        let url = '';

        const request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        switch (model) {
            case 'recipe':
				url = '/api/recipes/'+ user_id +'/?page=' + pageNumber;
				break;
			case 'favorite-recipes':
				url = '/api/favorite-recipes/'+ user_id +'/?page=' + pageNumber;
				break;
			case 'ingredient':
				url = '/api/ingredients/'+ user_id +'/?page=' + pageNumber;
				break;
		}
		
		if (recipeCategories.length > 0) {
			url += '&categories=' + recipeCategories.join(",");
		}

		if (cuisine_types.length > 0) {
			url += '&cuisines=' + cuisine_types.join(",");
		}

		if (model == 'ingredient' && ingredientCategories.length > 0) {
			url += '&categories=' + ingredientCategories.join(",");
		}

		if (model == 'ingredient' && ingredientSubcategories.length > 0) {
			url += '&subcategories=' + ingredientSubcategories.join(",");
		}

		fetch(url, request)
			.then(resp => resp.json())
			.then((data) => {
                switch (model) {
                    case 'recipe':
                        dispatch({
                        	type: 'SET_RECIPES',
                        	recipes: data.recipes
						});
						
						dispatch({
							type: 'SET_RECIPE_TOTAL',
							recipeTotal: data.recipe_total
						});
						break;

					case 'favorite-recipes':
                        dispatch({
                        	type: 'SET_FAVORITE_RECIPES',
                        	recipes: data.recipes
                        });
						break;

					case 'ingredient':
                        dispatch({
                        	type: 'SET_INGREDIENTS',
                        	ingredients: data.ingredients
						});
						
						dispatch({
							type: 'SET_INGREDIENT_TOTAL',
							ingredientTotal: data.ingredient_total
						});

                        break;
                }
			})
			.catch(err => console.log(err))
	}
};

export const setEditMode = (editMode) => {
	// editMode boolean value
	return (dispatch) => {
		dispatch({
			type: 'SET_EDIT_MODE',
			editMode
		});
	}
}

export const addCurrentRecipeIngredient = (ingredient) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_CURRENT_RECIPE_INGREDIENT',
			ingredient
		});
	}
}

export const removeCurrentRecipeIngredient = (ingredients) => {
	return (dispatch) => {
        dispatch({
            type: 'UPDATE_CURRENT_RECIPE_INGREDIENTS',
            ingredients
        });
	}
}

export const addCurrentRecipeDirection = (direction) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_CURRENT_RECIPE_DIRECTION',
			direction
		});
	}
}

export const removeCurrentRecipeDirection = (directions) => {
	return (dispatch) => {
        dispatch({
            type: 'UPDATE_CURRENT_RECIPE_DIRECTIONS',
            directions
        });
	}
}

export const addCurrentRecipeNote = (note) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_CURRENT_RECIPE_NOTE',
			note
		});
	}
}

export const removeCurrentRecipeNote = (notes) => {
	return (dispatch) => {
        dispatch({
            type: 'UPDATE_CURRENT_RECIPE_NOTES',
            notes
        });
	}
}

export const setCancelChanges = () => {
	return (dispatch) => {
		dispatch({
			type: 'SET_CANCEL_CHANGES_FILTER'
		});
		return new Promise((resolve, reject) => resolve());
	}
}

export const resetCancelChanges = () => {
	return (dispatch) => {
        dispatch({
            type: 'RESET_CANCEL_CHANGES_FILTER'
        });
	}
}

export const getRecipeSearchResults = (params) => {
	return new Promise((resolve, reject) => {
		const token = params.token;
		const csrf_token = params.csrf_token;
		const user_id = params.user_id;
		const value = params.value.toString();
		const favorites = params.favorites;

		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			}
		};

		let url = '/api/search/recipes?user_id=' + user_id + '&value=' + value;
		if (favorites) {
			url += '&favorites=true';
		}

		fetch(url, request)
			.then(resp => resp.json())
			.then((data) => {
				resolve(data);
			})
			.catch(err => reject(err))

	});
}

export const startNewRecipe = () => {
	return (dispatch) => {
        dispatch({
            type: 'SET_NEW_CURRENT_RECIPE'
        });
	}
}

export const addRecipeCategoryFilter = (recipe_category_id) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_RECIPE_CATEGORY_FILTER',
			recipe_category_id
		});
	}
}

export const removeRecipeCategoryFilter = (recipe_category_id) => {
	return (dispatch) => {
		dispatch({
			type: 'REMOVE_RECIPE_CATEGORY_FILTER',
			recipe_category_id
		});
	}
}

export const setRecipeCategoryFilter = (recipe_category_id) => {
	return (dispatch) => {
		dispatch({
			type: 'SET_RECIPE_CATEGORY_FILTER',
			recipe_category: [recipe_category_id]
		});
	}
}

export const addCuisineTypeFilter = (cuisine_type_id) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_CUISINE_TYPE_FILTER',
			cuisine_type_id
		});
	}
}

export const removeCuisineTypeFilter = (cuisine_type_id) => {
	return (dispatch) => {
		dispatch({
			type: 'REMOVE_CUISINE_TYPE_FILTER',
			cuisine_type_id
		});
	}
}

export const setCuisineTypeFilter = (cuisine_type_id) => {
	return (dispatch) => {
		dispatch({
			type: 'SET_RECIPE_CATEGORY_FILTER',
			cuisine_type: [cuisine_type_id]
		});
	}
}


export const startNewIngredient = () => {
	return (dispatch) => {
        dispatch({
            type: 'SET_NEW_CURRENT_INGREDIENT'
        });
	}
}

export const getIngredientSearchResults = (params) => {
	return new Promise((resolve, reject) => {
		const token = params.token;
		const csrf_token = params.csrf_token;
		const user_id = params.user_id;
		const value = params.value.toString();

		const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			}
		};

		let url = '/api/search/ingredients?user_id=' + user_id + '&value=' + value;

		fetch(url, request)
			.then(resp => resp.json())
			.then((data) => {
				resolve(data);
			})
			.catch(err => reject(err))

	});
}

export const addIngredientCategoryFilter = (ingredient_category_id) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_INGREDIENT_CATEGORY_FILTER',
			ingredient_category_id
		});
	}
}

export const removeIngredientCategoryFilter = (ingredient_category_id) => {
	return (dispatch, getState) => {
		const filteredSubcategories = getState().filters.ingredient_subcategory;
		const ingredientSubcategories = getState().ingredient_subcategories;

		// Remove any filtered subcategories for this category first
		ingredientSubcategories.map(subcategory => {
			if (
				subcategory.ingredient_category_id == ingredient_category_id &&
				filteredSubcategories.indexOf(subcategory.id) >= 0
			) {
				dispatch({
					type: 'REMOVE_INGREDIENT_SUBCATEGORY_FILTER',
					ingredient_subcategory_id: subcategory.id
				});
			}
		})

		// remove the ingredient category from filter list
		dispatch({
			type: 'REMOVE_INGREDIENT_CATEGORY_FILTER',
			ingredient_category_id
		});
	}
}

export const setIngredientCategoryFilter = (ingredient_category_id) => {
	return (dispatch) => {
		dispatch({
			type: 'SET_INGREDIENT_CATEGORY_FILTER',
			ingredient_category: [ingredient_category_id]
		});
	}
}

export const addIngredientSubcategoryFilter = (ingredient_subcategory_id) => {
	return (dispatch) => {
		dispatch({
			type: 'ADD_INGREDIENT_SUBCATEGORY_FILTER',
			ingredient_subcategory_id
		});
	}
}

export const removeIngredientSubcategoryFilter = (ingredient_subcategory_id) => {
	return (dispatch) => {
		dispatch({
			type: 'REMOVE_INGREDIENT_SUBCATEGORY_FILTER',
			ingredient_subcategory_id
		});
	}
}

export const setIngredientSubcategoryFilter = (subcategories) => {
	return (dispatch) => {
		dispatch({
			type: 'SET_INGREDIENT_SUBCATEGORY_FILTER',
			ingredient_subcategory: subcategories
		});
	}
}