import { canUseDOM } from 'lib/env';

export const SERVER_HOST = __DEV__ ? 'http://localhost:5000' : 'https://react-isomorphic.herokuapp.com';
export const API_ENDPOINT = canUseDOM ? '/api' : `${SERVER_HOST}/api`;
