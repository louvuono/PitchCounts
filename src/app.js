import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import AppRouter, { history } from './routers/AppRouter';

import configureStore from './store/configureStore';
import { startSetPitchCount } from './actions/pitchcounts';
import { login, logout } from './actions/auth';
import getVisiblePitchCounts from './selectors/pitchcounts';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
//import './playground/promises';

const store = configureStore();


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>    
);

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading... </p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var userName = localStorage.getItem('userName');

        // Updates the user attributes:
        user.updateProfile({
            displayName: userName
        }).then(function() {
            var displayName = user.displayName;

            console.log('User display name is: ' + displayName);
        }, function(error) {
            // An error happened.
        });

        console.log('Logged in as user:', user.uid);
        store.dispatch(login(user.uid));
        store.dispatch(startSetPitchCount()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        console.log('Logged out');
        store.dispatch(logout());
        localStorage.removeItem('userName');
        localStorage.removeItem('teamName');
        localStorage.removeItem('coachName');
        renderApp();
        history.push('/');
    }
});


