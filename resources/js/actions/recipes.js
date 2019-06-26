export const startSetRecipes = () => {
    return (dispatch) => {
        fetch('/api/recipes', {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(recipes => {
            dispatch(setRecipes(recipes));
        });
    };
};

export const setRecipes = (recipes) => ({
    type: 'SET_RECIPES',
    recipes
  });
  