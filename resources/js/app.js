import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetRecipes } from './actions/recipes';


const store = configureStore();
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		if (document.getElementById('app')) {
			ReactDOM.render(jsx, document.getElementById('app'));
			hasRendered = true;
		}
	}
};

// store.dispatch(startSetRecipes());
renderApp();