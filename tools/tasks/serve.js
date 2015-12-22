import { spawn } from 'child_process';
import dateFormat from '../lib/dateFormat';
import { DEBUG, buildPath } from '../config';
import gaze from 'gaze';
import run from '../lib/run';
import build from './build';

const RUNNING_REGEXP = '__DEV_START__';
const serverFile = `${buildPath}/server.js`;

let server;

function kill() {
  if (!server) {
    return;
  }
  server.kill('SIGTERM');
  server = null;
}

process.on('exit', () => {
  kill();
});

function _serve() {
  return new Promise((resolve, reject) => {
    function runServer() {
      kill();
      server = spawn('node', [serverFile], {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false,
      });
      function onStdOut(data) {
        const time = new Date();
        const match = data.toString('utf8').match(RUNNING_REGEXP);
        process.stdout.write(`[${dateFormat(time)}] `);
        process.stdout.write(data);
        if (match) {
          server.stdout.removeListener('data', onStdOut);
          return resolve();
        }
      }
      server.stderr.on('data', x => process.stderr.write(x));
      server.stdout.on('data', onStdOut);
    }
    runServer();
    gaze(serverFile, (err, watcher) => {
      if (err) {
        return reject(err);
      }
      watcher.on('changed', () => {
        runServer();
      });
    });
  });
}

async function serve() {
  await run(build);
  await _serve();
}

export default serve;
