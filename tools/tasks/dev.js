import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { webpackServer, webpackClient, stats } from '../config';
import run from '../lib/run';
import serve from './serve';

function dev() {
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
              ...hotMiddlewares,
            ],
          },
        }, resolve);
      }
    });
  });
}

export default dev;
