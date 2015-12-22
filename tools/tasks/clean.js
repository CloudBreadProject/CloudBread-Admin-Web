import del from 'del';
import { mkdirp } from '../lib/fs';

async function clean() {
  await del(['.tmp', 'build/*'], { dot: true });
  await mkdirp('build/assets');
  await mkdirp('build/public');
}

export default clean;
