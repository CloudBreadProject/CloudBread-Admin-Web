import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { webpackServer, webpackClient, stats } from '../config';

function openDebugger() {
  return new Promise((resolve, reject) => {
    const webpackPackage = [webpackClient, webpackServer];
    const bundler = webpack(webpackPackage);
    const hotMiddlewares = bundler.compilers
      .filter(compiler => compiler.options.target !== 'node')
      .map(compiler => webpackHotMiddleware(compiler));

    let bs;
    let runCount = 0;
    bundler.watch(200, (err, res) => {
      if (err) {
        return reject(err);
      }

      if (++runCount % webpackPackage.length !== 0) {
        return;
      }

      if (!bs) {
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

export default openDebugger;
