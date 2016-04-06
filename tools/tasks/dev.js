import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {
  webpackClient,
  stats,
  buildPath,
  DEV_PORT,
  DEV_HOST,
  DEV_HOSTNAME,
  DEV_SERVER,
} from '../config';
import brwoserSync from 'browser-sync';

import run from '../lib/run';
import clean from './clean';
import copy from './copy';

function _dev() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackClient);

    const server = new WebpackDevServer(compiler, {
      contentBase: buildPath,
      hot: true,
      publicPath: '/',
      stats,
      historyApiFallback: {
        index: '/',
      },
    });

    compiler.run(err => {
      try {
        if (err) throw err;
        server.listen(DEV_PORT, DEV_HOSTNAME, err2 => {
          if (err2) throw reject(err2);

          console.log(`Webpack develment server is listening at ${DEV_SERVER}`);

          const bs = brwoserSync.create();
          bs.init({
            proxy: {
              target: DEV_HOST,
              middleware: [
                webpackHotMiddleware(compiler),
              ],
            },
          }, resolve);
        });
      } catch (exception) {
        reject(exception);
      }
    });
  });
}

async function dev() {
  await run(clean);
  await run(copy);
  await _dev();
}

export default dev;
