import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-middleware';
import { webpackServer, webpackClient, stats } from '../config';
import run from '../lib/run';
import serve from './serve';
import clean from './clean';
import copy from './copy';

function _dev() {
  return new Promise((resolve, reject) => {
    const webpackPackage = [webpackClient, webpackServer];
    const bundler = webpack(webpackPackage);
    const hotMiddlewares = bundler.compilers
      .filter(compiler => compiler.options.target !== 'node')
      .map(compiler => webpackHotMiddleware(compiler));
    let bs;
    let runCount = 0;
    bundler.watch(200, async (err, res) => {
      if (err) {
        return reject(err);
      }

      console.log(res.toString(stats));

      if (++runCount % webpackPackage.length !== 0) {
        return;
      }

      if (!bs) {
        await run(serve);
        bs = browserSync.create();
        bs.init({
          proxy: {
            target: 'localhost:5000',
            middleware: [
              webpackDevMiddleware(bundler, {
                publicPath: '/',
                stats,
              }),
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
