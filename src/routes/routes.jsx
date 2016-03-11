import React from 'react';

import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from 'layouts/App';
import InspectorLayout from 'layouts/InspectorLayout';
import HomePage from 'containers/HomePage';
import ContentPage from 'containers/ContentPage';
import ResourceFindPage from 'containers/ResourceFindPage';
import ResourceViewPage from 'containers/ResourceViewPage';

import AuthRoute from 'routes/AuthRoute';

const routeContainer = (
  <Route component={App}>
    <Route path="/" component={InspectorLayout}>
      <IndexRoute component={HomePage} />
      <Route path="finder/:resourceId" component={ResourceFindPage} />
      <Route path="viewer/:resourceId" component={ResourceViewPage} />
      <Route path="page/:pageId" component={ContentPage} />
    </Route>
    {AuthRoute}
  </Route>
);

export default routeContainer;
