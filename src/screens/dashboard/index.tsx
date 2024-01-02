import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../../utils';
import Dashboard from './dashboard';

export default (): JSX.Element => (
  <Switch>
    <Route
      exact
      key="dashboard"
      path={routes.dasboard.root}
      component={Dashboard}
    />
  </Switch>
);
