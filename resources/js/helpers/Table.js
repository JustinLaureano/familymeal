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
            column: 'recipe_category',
            type: 'link',
            route: 'category/',
            class: ''},
        {
            label: 'Cuisine',
            column: 'cuisine_type',
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

export function getRecipeTableOptions() {
    return [
        {
            label: 'Update',
            icon: 'update',
            route: 'recipes/',
            action: '/edit'
        },
        {
            label: 'Delete',
            icon: 'delete',
            onClick: 'deleteRecipe'
        },
    ]
}