import mkdirp as _mkdirp from 'mkdirp';

function mkdirp(dir) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

export {
  mkdirp,
};
