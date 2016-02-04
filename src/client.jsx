import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import routes from 'routes';
import { history, setStore } from 'lib/context';
import createStore from 'redux/createStore';
import reducer from 'redux/reducer';

injectTapEventPlugin();

const appContainer = document.getElementById('app');
const store = createStore(history, reducer, window.__SYNC_DATA);
setStore(store);

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
