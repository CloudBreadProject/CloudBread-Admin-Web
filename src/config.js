import { canUseDOM } from './lib/env';

export const SERVER_HOST = __DEV__ ? 'http://localhost:5000' : 'https://react-isomorphic.herokuapp.com';
export const API_ENDPOINT = canUseDOM ? '/v1' : `${SERVER_HOST}/v1`;
