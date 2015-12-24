import React from 'react';
import { render } from 'react-dom';
import { match, RoutingContext } from 'react-router';
import routes from './routes';

const appContainer = document.getElementById('app');

function renderReact() {
  render(routes, appContainer);
}

renderReact();
