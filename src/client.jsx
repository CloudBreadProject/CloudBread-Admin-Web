import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import routes from 'routes';
import { setStore } from 'lib/context';
import createStore from 'redux/createStore';
import reducer from 'redux/reducer';

injectTapEventPlugin();

const appContainer = document.getElementById('app');
const store = createStore(browserHistory, reducer, window.__SYNC_DATA);
const history = syncHistoryWithStore(browserHistory, store);
setStore(store);

function run() {
  render(
    (
      <Provider store={store}>
        <Router history={history} routes={routes} />
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
