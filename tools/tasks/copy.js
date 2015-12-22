import ncp from 'ncp';
import watch from '../lib/watch';
import { all } from 'bluebird';
import { DEBUG, ROOT } from '../config';

function ncpAsync(origin, carry) {
  return new Promise((resolve, reject) => {
    ncp(origin, carry, (err) => err ? reject(err) : resolve());
  });
}

async function carryFile(file) {
  const relPath = `.${file.replace(ROOT, '')}`;
  const carryPath = relPath.replace('./src', './build');
  await ncpAsync(relPath, carryPath);
}

async function copy() {
  await all([
    ncpAsync('./src/public', './build/public'),
    ncpAsync('./src/assets', './build/assets'),
  ]);

  if (DEBUG) {
    const watcher = await watch(['./src/public/**/*', './src/assets/**/*']);
    watcher.on('changed', carryFile);
    watcher.on('added', carryFile);
  }
}

export default copy;
