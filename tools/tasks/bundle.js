import webpack from 'webpack';
import { webpackClient, stats } from '../config';

function bundle() {
  return new Promise((resolve, reject) => {
    const webpackPackage = [webpackClient];
    const bundler = webpack(webpackPackage);
    bundler.run((err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(res.toString(stats));
      return resolve();
    });
  });
}

export default bundle;
