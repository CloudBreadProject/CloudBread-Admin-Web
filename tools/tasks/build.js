import run from '../lib/run';
import bundle from './bundle';
import clean from './clean';

async function build() {
  await run(clean);
  await run(bundle);
}

export default build;
