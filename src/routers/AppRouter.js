import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
//import createHistory from 'history/createBrowserHistory';
var createHistory = require("history").createBrowserHistory;

import LoginPage from '../components/LoginPage';
import PitchCountDashboardPage from '../components/PitchCountDashboardPage';
import AddPitchCountPage from '../components/AddPitchCountPage';
import EditPitchCountPage from '../components/EditPitchCountPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={PitchCountDashboardPage}/>
                <PrivateRoute path="/create" component={AddPitchCountPage}/>
                <PrivateRoute path="/edit/:id" component={EditPitchCountPage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>  
        </div>      
    </Router>
);

export default AppRouter;