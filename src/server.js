import express from 'express';
import { resolve } from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from './components/Html';

const ROOT = resolve(__dirname, '.');
const app = express();
app.use(express.static(`${ROOT}/public`));
app.get('*', (req, res) => {
  res.status(200).send(renderToStaticMarkup(<Html />));
});

const server = app.listen(process.env.PORT || 5000, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});
