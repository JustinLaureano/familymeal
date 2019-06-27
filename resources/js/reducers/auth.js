const authReducerDefaultState = [];

export default (state = authReducerDefaultState, action) => {
	switch (action.type) {
		case 'LOGIN':
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