import superagent from 'superagent';
import { API_ENDPOINT } from 'config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  if (path.match('//')) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return API_ENDPOINT + adjustedPath;
}

class ApiFetcher {
  constructor() {
    methods.forEach((method) => // eslint-disable-line
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
