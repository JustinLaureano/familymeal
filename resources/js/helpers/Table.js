export function getRecipeTableHeaders() {
    return [
        {
            label: 'Name',
            column: 'name',
            type: 'link',
            route: 'recipe/',
            class: ''
        },
        {
            label: 'Category',
            column: 'recipe_category_id',
            type: 'link',
            route: 'category/',
            class: ''},
        {
            label: 'Cuisine',
            column: 'cuisine_type_id',
            type: 'link',
            route: 'cuisine-types/',
            class: ''
        },
        {
            label: 'Created At',
            column: 'created_at',
            type: 'date',
            class: 'table__inactive'
        },
    ];
}