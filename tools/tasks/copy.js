import ncp from 'ncp';
import replace from 'replace';
import watch from '../lib/watch';
import mkdir from '../lib/mkdir';
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
  await mkdir('build/public');
  await mkdir('build/assets');

  await all([
    ncpAsync('./src/public', './build/public'),
    ncpAsync('./src/assets', './build/assets'),
    ncpAsync('./package.json', './build/package.json'),
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js",',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });

  if (DEBUG) {
    const watcher = await watch(['./src/public/**/*', './src/assets/**/*']);
    watcher.on('changed', carryFile);
    watcher.on('added', carryFile);
  }
}

export default copy;
