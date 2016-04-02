import React from 'react';

import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import AppLayout from 'components/AppLayout';
import InspectorLayout from 'components/InspectorLayout';
import HomePage from 'components/HomePage';
import ContentPage from 'components/ContentPage';
import ResourceFindPage from 'components/ResourceFindPage';
import ResourceEditPage from 'components/ResourceEditPage';
import AnalystPage from 'components/AnalystPage';

import AuthRoute from 'routes/AuthRoute';

const routeContainer = (
  <Route component={AppLayout}>
    <Route path="/" component={InspectorLayout}>
      <IndexRoute component={HomePage} />
      <Route path="finder/:resourceId" component={ResourceFindPage} />
      <Route path="editor/:resourceId" component={ResourceEditPage} />
      <Route path="editor/:resourceId/:identifier" component={ResourceEditPage} />
      <Route path="page/:pageId" component={ContentPage} />
      <Route path="analyst" component={AnalystPage} />
    </Route>
    {AuthRoute}
  </Route>
);

export default routeContainer;
