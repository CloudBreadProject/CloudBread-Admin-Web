import del from 'del';

async function clean() {
  await del(['.tmp', 'build/*'], { dot: true });
}

export default clean;
