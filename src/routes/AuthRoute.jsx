import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import AuthLayout from 'components/AuthLayout';
import AuthPage from 'components/AuthPage';

const AuthRoute = (
  <Route path="/auth" component={AuthLayout}>
    <IndexRoute component={AuthPage} />
  </Route>
);

export default AuthRoute;
