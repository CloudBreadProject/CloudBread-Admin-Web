import React from 'react';

import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import AppLayout from 'components/AppLayout';
import InspectorLayout from 'components/InspectorLayout';
import HomePage from 'components/HomePage';
import BIToolPage from 'components/BIToolPage';
import ResourceFindPage from 'components/ResourceFindPage';
import ResourceEditPage from 'components/ResourceEditPage';

const routeContainer = (
  <Route component={AppLayout}>
    <Route path="/" component={InspectorLayout}>
      <IndexRoute component={HomePage} />
      <Route path="bi" component={BIToolPage} />
      <Route path="finder/:resourceId" component={ResourceFindPage} />
      <Route path="editor/:resourceId" component={ResourceEditPage} />
      <Route path="editor/:resourceId/:identifier" component={ResourceEditPage} />
    </Route>
  </Route>
);

export default routeContainer;
