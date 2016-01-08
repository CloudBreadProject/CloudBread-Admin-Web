import { resolve } from 'path';
import express from 'express';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import reducer from './redux/reducer';
import fetchComponent from './redux/fetchComponent';
import routes from './routes';
import * as reduxMiddlewares from './redux/middlewares';
import Html from './components/Html';
import { initDOM, history } from './lib/context';
import apiV1 from './api/v1';
import assets from './assets.json';

const ROOT = resolve(__dirname, '.');
const app = express();
app.use(express.static(`${ROOT}/public`));

if (__DEV__) {
  app.use((req, res, next) => {
    console.log(req.url);
    return next();
  });
}
app.use('/v1', apiV1);

app.get('*', (req, res) => {
  match({ routes, location: req.url }, async (error, redirectLocation, renderProps) => {
    try {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        initDOM(req);
        const customMiddlewares = [];
        for (const idx in reduxMiddlewares) {
          const middleware = reduxMiddlewares[idx];
          if (typeof(middleware) === 'function') {
            customMiddlewares.push(middleware(req, res));
          }
        }
        const store = createStore(customMiddlewares, history, reducer);
        await fetchComponent(store.dispatch, renderProps.components, renderProps.params);
        const content = renderToString((
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ));
        res.status(200).send(
          `<!doctype html>` +
          renderToStaticMarkup((
            <Html
              store={store}
              assets={assets}>
              {content}
            </Html>
          ))
        );
      } else {
        res.status(404).send('Not found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('server error');
    }
  });
});

const server = app.listen(process.env.PORT || 5000, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});
