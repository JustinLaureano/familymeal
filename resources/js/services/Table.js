export function getRecipeTableHeaders() {
    return [
        {
            label: 'Name',
            column: 'name',
            type: 'link',
            route: 'recipes/',
            class: 'table__emphasize'
        },
        {
            label: 'Category',
            column: 'recipe_category',
            type: 'text',
            // route: 'category/',
            class: 'table__inactive',
        },
        {
            label: 'Cuisine',
            column: 'cuisine_type',
            type: 'text',
            // route: 'cuisine-types/',
            class: 'table__inactive'
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
            label: 'Favorite',
            icon: 'star_rate',
            onClick: 'favoriteRecipe'
        },
        {
            label: 'Update',
            icon: 'edit',
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