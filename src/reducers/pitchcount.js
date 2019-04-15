// Pitch Counts reducer
const pitchcountsDefaultState = [];

export default (state = pitchcountsDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PITCHCOUNT':
            //return state.concat(action.expense);
            console.log('Adding pitchcount');
            return [
                ...state,
                action.pitchcount
            ];
        case 'REMOVE_PITCHCOUNT':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_PITCHCOUNT':
            return state.map((pitchcount) => {
                if (pitchcount.id === action.id) {
                    return {
                        ...pitchcount,
                        ...action.updates
                    }
                } else {
                    return pitchcount;
                }
            });
        case 'SET_PITCHCOUNT':
            return action.pitchcount;
        default:
            return state;
    }
};