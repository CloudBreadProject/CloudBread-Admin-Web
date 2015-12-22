import run from './lib/run';

if (process.argv.length < 3) {
  throw Error('Invalid parameter');
}

const taskName = process.argv[2];
const task = require(`./tasks/${taskName}`);
if (!task) {
  throw Error(`Unknown task <${taskName}>`);
}
run(task.default)
  .catch(e => console.error(e));
