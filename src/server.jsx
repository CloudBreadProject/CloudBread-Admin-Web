/* eslint no-console: 0 */
import { resolve } from 'path';
import express from 'express';
import PrettyError from 'pretty-error';

// render components
import React from 'react';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import fetchComponent from 'redux/fetchComponent';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from 'redux/createStore';
import reducer from 'redux/reducer';
import routes from 'routes';
import Html from 'components/Html';
import { initDOM, setStore } from 'core/context';
import assets from './assets.json';
import { setApiEndpoint } from 'actions/fetcher';

// serve static public assets
const ROOT = resolve(__dirname, '.');
const app = express();
app.use(express.static(`${ROOT}/public`));
const pe = new PrettyError();

// print request logs
if (__DEV__) {
  app.use((req, res, next) => {
    console.log(req.url);
    return next();
  });
}

// bind API endpoint
app.use('/api', require('api').default);

// serve client
app.get('*', async (req, res) => {
  // prepare virtual environments to render
  const memoryHistory = createMemoryHistory(req.path);
  const store = createStore(memoryHistory, reducer);
  const history = syncHistoryWithStore(memoryHistory, store);
  const { API_ENDPOINT } = process.env;
  await store.dispatch(setApiEndpoint((!!API_ENDPOINT ? API_ENDPOINT : `http://localhost:${__PORT__}/api/`)));
  setStore(store);

  // match route
  match({ history, routes, location: req.url }, async (error, redirectLocation, renderProps) => {
    try {
      if (error) throw error;

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (renderProps) {
        // set navigator through request to match css
        initDOM(req);

        // pre-fetch components'
        await fetchComponent(store.dispatch, renderProps.components, {
          ...renderProps.params,
          ...req.query,
        });

        // render app
        const content = renderToString((
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ));

        // serve app with HTML document type
        return res.status(200).send(
          `<!doctype html>` + // eslint-disable-line
          renderToStaticMarkup((
            <Html
              store={store}
              assets={assets}
            >
              {content}
            </Html>
          ))
        );
      }

      // route not found
      return res.status(404).send('Not found');
    } catch (err) {
      console.log(pe.render(err));
      return res.status(500).send('Server error');
    }
  });
});

// handle error
app.use((err, req, res, next) => { // eslint-disable-line
  console.log(pe.render(err));
  return res.status(500).send(err);
});

// launch server
const server = app.listen(process.env.PORT || __PORT__, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});
