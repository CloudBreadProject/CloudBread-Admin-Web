import del from 'del';

async function clean() {
  await del(['.tmp', 'build/*', '!build/.git'], { dot: true });
}

export default clean;
