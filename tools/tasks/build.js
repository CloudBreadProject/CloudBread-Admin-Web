import run from '../lib/run';
import bundle from './bundle';
import clean from './clean';
import copy from './copy';

async function build() {
  await run(clean);
  await run(copy);
  await run(bundle);
}

export default build;
