import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-middleware';
import { webpackServer, webpackClient, stats, DEV_PORT } from '../config';
import run from '../lib/run';
import serve from './serve';
import clean from './clean';
import copy from './copy';

function _dev() {
  return new Promise((resolve) => {
    const webpackPackage = [webpackClient, webpackServer];
    const bundler = webpack(webpackPackage);
    const hotMiddlewares = bundler.compilers
      .filter(compiler => compiler.options.target !== 'node')
      .map(compiler => webpackHotMiddleware(compiler));
    const wpMiddleware = webpackDevMiddleware(bundler, {
      publicPath: '/',
      stats,
    });
    let bs;
    bundler.plugin('done', async () => {
      if (!bs) {
        await run(serve);
        bs = browserSync.create();
        bs.init({
          proxy: {
            target: `localhost:${DEV_PORT}`,
            middleware: [
              wpMiddleware,
              ...hotMiddlewares,
            ],
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
