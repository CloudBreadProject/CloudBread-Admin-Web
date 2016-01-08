import superagent from 'superagent';
import { canUseDOM } from './context';
import { API_ENDPOINT, SERVER_HOST } from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (canUseDOM) {
    return API_ENDPOINT + adjustedPath;
  }
  return SERVER_HOST + adjustedPath;
}

class ApiFetcher {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, res) => {
          if (err) {
            reject(res && res.body ? res.body : err);
          } else {
            resolve(res);
          }
        });

      }));
  }
}

const fetch = new ApiFetcher();

export default fetch;
