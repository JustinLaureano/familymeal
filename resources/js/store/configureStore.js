import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import filterReducer from '../reducers/filters';
import recipesReducer from '../reducers/recipes';
import totalsReducer from '../reducers/totals';
import userReducer from '../reducers/user';
import userSettingsReducer from '../reducers/userSettings';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			filters: filterReducer,
			recipes: recipesReducer,
			totals: totalsReducer,
			user: userReducer,
			userSettings: userSettingsReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};