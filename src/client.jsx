import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const appContainer = document.getElementById('app');

function renderReact() {
  render(routes, appContainer);
}

renderReact();
