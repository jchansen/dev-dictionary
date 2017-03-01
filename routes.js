import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

/**
 * Wrapping the Master component with this decorator provides an easy way
 * to redirect the user to a login experience if we don't know who they are.
 */
import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
import Master from './src/components/Master';
import Layout from './src/components/Layout';
import Logout from './src/components/Logout';
import Login from './src/components/Login';
import Welcome from './src/components/Welcome';
import Dictionary from './src/components/Dictionary';
import TermContainer from './src/components/TermContainer';

export default (
  <Route>
    <Route component={Layout}>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Route>

    <Route component={UserIsAuthenticated(Master)}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Welcome} />
        <Route path="terms">
          <IndexRoute component={Dictionary} />
          <Route path=":termName" component={TermContainer} />
        </Route>
      </Route>
    </Route>
  </Route>
);
