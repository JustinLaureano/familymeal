import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import cuisineTypesReducer from '../reducers/cuisine_types';
import filterReducer from '../reducers/filters';
import ingredientsReducer from '../reducers/ingredients';
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
			recipes: recipesReducer,
			recipe_categories: recipeCategoriesReducer,
			totals: totalsReducer,
			user: userReducer,
			userSettings: userSettingsReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};