import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import recipesReducer from '../reducers/recipes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			recipes: recipesReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};