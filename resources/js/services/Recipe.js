export function getAverageRating(ratings) {
    if (ratings.length == 0) {
        return 0;
    }

    const total = ratings.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.rating), 0);
    return total / ratings.length;
}


export function getUserRating(ratings, user_id) {
    if (ratings.length == 0) {
        return 0;
    }

    const rating = ratings.filter(rating => {
        return rating.user_id == user_id;
    });
    return rating[0];
}


export function arrayMove(arr, curIndex, toIndex) {
    var clone = arr.slice(0);
    var element = clone[curIndex];
    clone.splice(curIndex, 1);
    clone.splice(toIndex, 0, element);
    return clone;
}

export function validateRecipe(recipe) {
    console.log(recipe);

    const errors = [];

    // name
    if (recipe.info.name == null) {
        errors.push('Recipe Needs a Name');
    }

    // cuisine_type
    if (recipe.info.cuisine_type_id === '' || typeof recipe.info.cuisine_type_id !== 'number') {
        errors.push('Select a cuisine type');
    }

    // difficulty
    if (recipe.info.difficulty === '' || typeof recipe.info.difficulty !== 'string') {
        errors.push('Select a recipe difficulty');
    }

    // recipe category id
    if (recipe.info.recipe_category_id === '' || typeof recipe.info.recipe_category_id !== 'number') {
        errors.push('Select a recipe category');
    }

    // directions
    if (recipe.directions.length === 0) {
        errors.push('Enter at least 1 direction');
    }

    // ingredients
    if (recipe.ingredients.length === 0) {
        errors.push('Enter at least 1 ingredient');
    }

    // return validation
    return errors.length === 0 ? { valid: true } : { errors }
}

export function getNewRecipe(currentRecipe) {
    // Calculate user rating
    let rating = 0;
    const ratingStars = document.querySelectorAll('.recipe-grid__stars');
    for (const star of ratingStars) {
        if (star.innerHTML === 'star') {
            rating++;
        }
    }

    return {
        info: {
            cook_time: document.querySelector('input[name="cook-time"]').value,
            cuisine_type_id: parseInt(document.querySelector('select[name="cuisine-type"]').value),
            difficulty: document.querySelector('select[name="difficulty"]').value,
            name: document.querySelector('input[name="name"]').value,
            portions: document.querySelector('input[name="portions"]').value,
            prep_time: document.querySelector('input[name="prep-time"]').value,
            recipe_category_id: parseInt(document.querySelector('select[name="recipe-category"]').value)
        },
        photo: null,
        summary: {
            summary: document.querySelector('textarea[name="summary"]').value
        },
        ratings: [{ rating }],
        directions: currentRecipe.directions,
        ingredients: currentRecipe.ingredients,
        notes: currentRecipe.notes
    }
}