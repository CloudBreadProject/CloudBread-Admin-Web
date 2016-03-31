import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppLayout from 'components/AppLayout';
import HomePage from 'components/HomePage';
import ContentPage from 'components/ContentPage';

const routeContainer = (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={HomePage} />
    <Route path="page/:pageId" component={ContentPage} />
  </Route>
);

export default routeContainer;
