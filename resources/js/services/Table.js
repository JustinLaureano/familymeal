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
            class: 'table__inactive',
        },
        {
            label: 'Cuisine',
            column: 'cuisine_type',
            type: 'text',
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
            icon: 'favorite',
            iconClass: 'gold',
            onClick: 'favoriteRecipe'
        },
        {
            label: 'Update',
            icon: 'edit',
            onClick: 'updateRecipe'
        },
        {
            label: 'Delete',
            icon: 'delete',
            onClick: 'deleteRecipe'
        },
    ]
}

export function getIngredientTableHeaders() {
    return [
        {
            label: 'Name',
            column: 'name',
            type: 'link',
            route: 'ingredients/',
            class: 'table__emphasize'
        },
        {
            label: 'Category',
            column: 'ingredient_category_name',
            type: 'text',
            class: 'table__inactive',
        },
        {
            label: 'Subcategory',
            column: 'ingredient_subcategory_name',
            type: 'text',
            class: 'table__inactive'
        }
    ];
}

export function getIngredientTableOptions() {
    return [
        {
            label: 'Shopping List',
            icon: 'add',
            onClick: 'updateShoppingList'
        },
        {
            label: 'Update',
            icon: 'edit',
            onClick: 'updateIngredient'
        },
        {
            label: 'Delete',
            icon: 'delete',
            onClick: 'deleteIngredient'
        },
    ]
}