import http from 'http';
import https from 'https';

export default async (url) => new Promise((resolve, reject) => {
  const controller = url.match('https') ? https : http;
  return controller.get(url, res => resolve(res)).on('error', err => reject(err));
});
