const measurementUnitsReducerDefaultState = [];

export default (state = measurementUnitsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_MEASUREMENT_UNITS':
            return action.measurement_units;
        default:
            return state;
    }
};