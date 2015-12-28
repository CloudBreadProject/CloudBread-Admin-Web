import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const appContainer = document.getElementById('app');

function run() {
  render(routes, appContainer);
  appContainer.style.visibility = 'initial';
}

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
