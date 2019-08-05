import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import cuisineTypesReducer from '../reducers/cuisine_types';
import favoriteRecipesReducer from '../reducers/favorite_recipes';
import filterReducer from '../reducers/filters';
import ingredientsReducer from '../reducers/ingredients';
import measurementUnitsReducer from '../reducers/measurement_units';
import recipesReducer from '../reducers/recipes';
import recipeCategoriesReducer from '../reducers/recipe_categories';
import totalsReducer from '../reducers/totals';
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
			measurement_units: measurementUnitsReducer,
			recipes: recipesReducer,
			favorite_recipes: favoriteRecipesReducer,
			recipe_categories: recipeCategoriesReducer,
			totals: totalsReducer,
			user: userReducer,
			user_settings: userSettingsReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};