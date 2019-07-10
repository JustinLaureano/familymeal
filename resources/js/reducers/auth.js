const authReducerDefaultState = [];

export default (state = authReducerDefaultState, action) => {
	switch (action.type) {
		case 'LOGIN':
		case 'SET_TOKEN':
			return {
				...state,
				token: action.token
			};
		case 'SET_CSRF_TOKEN':
			return {
				...state,
				csrf_token: action.csrf_token
			};
		case 'SET_DATA':
			return action.data;
		case 'LOGOUT':
			return {};
		default:
			return state;
	};
};