import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { canUseDOM } from 'core/env';

export default function createStore(history, reducers) {
  const middlewares = [
    thunk,
  ];

  let finalCreateStore;
  if (__DEV__ && canUseDOM) {
    finalCreateStore = compose(
      applyMiddleware(...middlewares, require('redux-logger')()), // eslint-disable-line
      typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(_createStore);
  }

  const store = finalCreateStore(reducers);

  return store;
}
