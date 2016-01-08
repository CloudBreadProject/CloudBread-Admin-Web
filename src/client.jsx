import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import routes from './routes';
import { history } from './lib/context';
import createStore from './redux/createStore';
import reducer from './redux/reducer';
import * as reduxMiddlewares from './redux/middlewares';

injectTapEventPlugin();

const appContainer = document.getElementById('app');
const customMiddlewares = [];
for (const idx in reduxMiddlewares) {
  const middleware = reduxMiddlewares[idx];
  if (typeof(middleware) === 'function') {
    customMiddlewares.push(middleware());
  }
}
const store = createStore(customMiddlewares, history, reducer, window.__SYNC_DATA);

function run() {
  render(
    (
      <Provider store={store}>
        {routes}
      </Provider>
    ),
    appContainer
  );
  appContainer.style.visibility = 'initial';
}

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
