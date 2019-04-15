import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import PitchCountList from './PitchCountList';
import PitchCountListFilters from './PitchCountListFilters';
import PitchCountSummary from './PitchCountSummary';

const PitchCountDashboardPage = () => (
    <div>
        <PitchCountSummary />
        <PitchCountListFilters />
        <PitchCountList />
    </div>
);

export default PitchCountDashboardPage;