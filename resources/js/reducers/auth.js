const authReducerDefaultState = [];

export default (state = authReducerDefaultState, action) => {
	switch (action.type) {
		case 'LOGIN':
		case 'SET_TOKEN':
			return {
				...state,
				token: action.token
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	};
};