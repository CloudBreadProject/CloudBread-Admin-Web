import { resolve } from 'path';
import express from 'express';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import routes from './routes';
import Html from './components/Html';
import { initDOM } from './lib/context';
import apiV1 from './api/v1';

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
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      initDOM(req);
      const content = renderToString(<RouterContext {...renderProps} />);
      res.status(200).send(
        `<!doctype html>` +
        renderToStaticMarkup(<Html>{content}</Html>)
      );
    } else {
      res.status(404).send('Not found');
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
