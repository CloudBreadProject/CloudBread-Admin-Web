import { canUseDOM } from './env';
import { createMemoryHistory, createHistory } from 'history';

// to render Material-UI, need fake user-agent
if (global && !global.navigator) {
  global.navigator = {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36',
  };
}

let _title = '';
let _tail = '';
export const socket = canUseDOM && window.io ? io.connect('localhost:5000') : null;
export const history = canUseDOM ? createHistory() : createMemoryHistory();

export function initDOM(req) {
  if (!canUseDOM && req.headers['user-agent']) {
    navigator.userAgent = req.headers['user-agent'];
  }

  _title = '';
  _tail = '';
}

export function getTitle() {
  return _title;
}

export function setTitle(title) {
  _title = title;
}

export function getTail() {
  return _tail;
}

export function addTail(content) {
  _tail += content;
}

const context = {
  history,
  getTitle,
  setTitle,
  socket,
  getTail,
  addTail,
  initDOM,
};

export default context;
