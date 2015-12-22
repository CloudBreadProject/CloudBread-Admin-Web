import run from '../lib/run';
import serve from './serve';
import openDebugger from './openDebugger';

async function dev() {
  await run(serve);
  await run(openDebugger);
}

export default dev;
