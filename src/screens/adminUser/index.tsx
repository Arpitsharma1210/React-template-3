import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../../utils';
import AdminUserList from './adminUserList';

export default ():JSX.Element => (
  <Switch>
    <Route
      exact
      key="list-admin-user"
      path={routes.adminUser.root}
      component={AdminUserList}
    />
  </Switch>
);
