import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from 'lib/context';
import App from 'layouts/App';
import HomePage from 'containers/HomePage';
import ContentPage from 'containers/ContentPage';

const routeContainer = (
  <Router
    history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="page/:pageId" component={ContentPage} />
    </Route>
  </Router>
);

export default routeContainer;
