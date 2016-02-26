import { canUseDOM } from './env';

// to render Material-UI, need fake user-agent
if (global && !global.navigator) {
  global.navigator = {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36', // eslint-disable-line
  };
}

let _title = '';
let _store = null;

export function initDOM(req) {
  if (!canUseDOM && req.headers['user-agent']) {
    navigator.userAgent = req.headers['user-agent'];
  }

  _title = '';
  _store = null;
}

export function getTitle() {
  return _title;
}

export function setTitle(title) {
  _title = title;

  if (canUseDOM) {
    document.title = _title;
  }
}

export function setStore(store) {
  _store = store;
}

export function getStore() {
  return _store;
}
