import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { setToken } from './actions/auth';
import { setUser } from './actions/user';

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

			const page = document.querySelector('meta[name="page"]').content;
			if (page && page !== '/home') {
				history.push('/' + page);
			}
		}
	}
};

const api_token = document.querySelector('meta[name="api-token"]').content;
const user_id = document.querySelector('meta[name="user_id"]').content;
store.dispatch(setToken(api_token));
store.dispatch(setUser(user_id));
  
renderApp();