export function validateIngredient(ingredient) {

    const errors = [];

    // ingredient name
    if (ingredient.name == null || ingredient.name.trim() == '') {
        errors.push('Ingredient Needs a Name');
    }

    // ingredient category
    if (ingredient.ingredient_category_id === '' || 
        typeof ingredient.ingredient_category_id !== 'number')
    {
        errors.push('Select a Ingredient Category');
    }

        // ingredient category
        if (ingredient.ingredient_subcategory_id === '' || 
        typeof ingredient.ingredient_subcategory_id !== 'number')
    {
        errors.push('Select a Ingredient Subcategory');
    }

    // return validation
    return errors.length === 0 ? { valid: true } : { errors }
}

export function getNewIngredient(currentIngredient) {
    console.log(currentIngredient);
    return {
        name: document.querySelector('input[name="name"]').value,
        ingredient_category_id: parseInt(document.querySelector('select[name="ingredient-category"]').value),
        ingredient_subcategory_id: parseInt(document.querySelector('select[name="ingredient-subcategory"]').value)
    }
}