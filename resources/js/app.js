import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetUser } from './actions/user';
import { setToken } from './actions/auth';


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

if (document.querySelector('input[name="token"]').value != '') {
	const userID = document.querySelector('input[name="user_id"]').value;
	const token = document.querySelector('input[name="token"]').value;
	store.dispatch(startSetUser(userID, token));
	store.dispatch(setToken(token));
}

renderApp();