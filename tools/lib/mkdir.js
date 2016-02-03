import mkdirp from 'mkdirp';

export default (dir) => new Promise((resolve, reject) => {
  mkdirp(dir, (err) => err ? reject(err) : resolve());
});
