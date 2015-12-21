import webpack from 'webpack';
import { webpackServer, stats } from '../config';

function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(webpackServer);
    bundler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      console.log(stats.toString(stats));
      return resolve();
    });
  });
}

export default bundle;
