import gaze from 'gaze';

export default (patterns, options) => new Promise((resolve, reject) => { // eslint-disable-line
  gaze(patterns, options, (err, watcher) => (err ? reject(err) : resolve(watcher)));
});
