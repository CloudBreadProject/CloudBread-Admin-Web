import gaze from 'gaze';

export default (patterns, options) => new Promise((resolve, reject) => {
  gaze(patterns, options, (err, watcher) => err ? reject(err) : resolve(watcher));
});
