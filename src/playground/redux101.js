import { createStore } from 'redux';

// Action generators -- functions that return action objects

const add = ({a, b}, c) => {
    return a + b + c;
}
console.log(add( {a: 1, b: 12}, 100));


// Action generators -- return action functions 

const incrementCount = ({incrementBy = 1} = {}) => ({ 
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({ 
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({count = 0} = {}) => ({ 
    type: 'SET',
    count
});

const resetCount = () => ({ 
    type: 'RESET',
    count: 0
});

// const incrementCount = (payload = {}) => ({ 
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

// Reducers
// 1. reducers are pure functions 
//      output determined by input
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
    //console.log('Running store');
    switch (action.type) {
        case 'INCREMENT':
            //const increment = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            //return { count: state.count + increment };
            return { count: state.count + action.incrementBy };
        case 'DECREMENT' :
            const decrement = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return { count: state.count - decrement };
        case 'SET' :
            const value = typeof action.count === 'number' ? action.count : -10;
            return { count: value };
        case 'RESET' :
            return { count: 0 };
        default:
            return state;
    }
};

const store = createStore(countReducer);

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

// Increment the count
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});

store.dispatch(incrementCount({incrementBy: 6}));

// Increment the count
store.dispatch({
    type: 'INCREMENT'
});

// Unsubscribe watching for state changes
//unsubscribe();

// Reset the count
store.dispatch({
    type: 'RESET'
});

// Decrement the count
store.dispatch({
    type: 'DECREMENT',
    decrementBy: 23
});

store.dispatch(decrementCount({decrementBy: 8}));

// Decrement the count
store.dispatch({
    type: 'DECREMENT'
});

// Set the count
store.dispatch({
    type: 'SET',
    count: 255
});

// Set the count
store.dispatch({
    type: 'SET'
});

store.dispatch(setCount({count: -157}));

store.dispatch(resetCount());

// Decrement the count
store.dispatch({
    type: 'DECREMENT'
});
