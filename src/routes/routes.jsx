import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'layouts/App';
import HomePage from 'containers/HomePage';
import ContentPage from 'containers/ContentPage';

import AuthRoute from 'routes/AuthRoute';

const routeContainer = (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="page/:pageId" component={ContentPage} />
    </Route>
    {AuthRoute}
  </Route>
);

export default routeContainer;
