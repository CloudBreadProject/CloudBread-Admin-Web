import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from '../lib/context';
import App from '../components/App';
import HomePage from '../components/HomePage';
import ContentPage from '../components/ContentPage';
import AsyncProps from 'async-props';

const routeContainer = (
  <Router history={history} RoutingContext={AsyncProps}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path=":pageId" component={ContentPage} />
    </Route>
  </Router>
);

export default routeContainer;
