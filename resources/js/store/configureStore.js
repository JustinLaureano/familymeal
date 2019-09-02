import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import cuisineTypesReducer from '../reducers/cuisine_types';
import favoriteRecipesReducer from '../reducers/favorite_recipes';
import filterReducer from '../reducers/filters';
import ingredientsReducer from '../reducers/ingredients';
import ingredientCategoriesReducer from '../reducers/ingredient_categories';
import ingredientSubcategoriesReducer from '../reducers/ingredient_subcategories';
import measurementUnitsReducer from '../reducers/measurement_units';
import recipesReducer from '../reducers/recipes';
import recipeCategoriesReducer from '../reducers/recipe_categories';
import shoppingListReducer from '../reducers/shoppingList';
import toastReducer from '../reducers/toast';
import totalsReducer from '../reducers/totals';
import uiReducer from '../reducers/ui';
import uploadsReducer from '../reducers/uploads';
import userReducer from '../reducers/user';
import userSettingsReducer from '../reducers/userSettings';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			cuisine_types: cuisineTypesReducer,
			filters: filterReducer,
			ingredients: ingredientsReducer,
			ingredient_categories: ingredientCategoriesReducer,
			ingredient_subcategories: ingredientSubcategoriesReducer,
			measurement_units: measurementUnitsReducer,
			recipes: recipesReducer,
			favorite_recipes: favoriteRecipesReducer,
			recipe_categories: recipeCategoriesReducer,
			shopping_lists: shoppingListReducer,
			toast: toastReducer,
			totals: totalsReducer,
			ui: uiReducer,
			uploads: uploadsReducer,
			user: userReducer,
			user_settings: userSettingsReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};