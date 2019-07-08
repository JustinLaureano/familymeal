const userSettingsReducerDefaultState = [];

export default (state = userSettingsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER_SETTINGS':
            return action.userSettings;
        default:
            return state;
    }
  };