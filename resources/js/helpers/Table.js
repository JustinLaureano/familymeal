export function getRecipeTableHeaders() {
    return [
        {label: 'Name', data: 'name'},
        {label: 'Category', data: 'recipe_category_id'},
        {label: 'Cuisine', data: 'cuisine_type_id'},
        {label: 'Created At', data: 'created_at'},
    ];
}