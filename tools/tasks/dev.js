import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { webpackServer, webpackClient, stats, DEV_PORT } from '../config';
import run from '../lib/run';
import serve from './serve';
import clean from './clean';
import copy from './copy';

function _dev() {
  return new Promise((resolve, reject) => {
    const webpackPackage = [webpackClient, webpackServer];
    const bundler = webpack(webpackPackage);
    const clientBundle = webpack(webpackClient);

    const devMiddleware = webpackDevMiddleware(clientBundle, {
      publicPath: '/',
      stats,
    });

    const hotMiddleware = webpackHotMiddleware(clientBundle);

    let runCount = 0;

    bundler.watch({
      aggregateTimeout: 200,
    }, async (err, result) => {
      if (err) {
        return reject(err);
      }
      console.log(result.toString(stats));
      if (++runCount === webpackPackage.length) {
        await run(serve);
        const bs = browserSync.create();
        bs.init({
          proxy: {
            target: `localhost:${DEV_PORT}`,
            middleware: [devMiddleware, hotMiddleware],
          },
        }, resolve);
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
