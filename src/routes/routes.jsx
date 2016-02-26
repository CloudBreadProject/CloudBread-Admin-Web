import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'layouts/App';
import HomePage from 'containers/HomePage';
import ContentPage from 'containers/ContentPage';

const routeContainer = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="page/:pageId" component={ContentPage} />
  </Route>
);

export default routeContainer;
