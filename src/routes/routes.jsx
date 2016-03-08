import React from 'react';

import Route from 'react-router/lib/Route';

import InspectorLayout from 'layouts/InspectorLayout';
import ContentPage from 'containers/ContentPage';

import AuthRoute from 'routes/AuthRoute';

const routeContainer = (
  <Route>
    <Route path="/" component={InspectorLayout}>
      <Route path="page/:pageId" component={ContentPage} />
    </Route>
    {AuthRoute}
  </Route>
);

export default routeContainer;
