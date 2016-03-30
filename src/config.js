global.__DEV__ = global.__DEV__ ? __DEV__ : false;

export const SERVER_HOST = __DEV__ ? `http://localhost:${__PORT__}` : 'https://react-universe.herokuapp.com';
export const API_ENDPOINT = 'https://dw-apiapp-dev-01.azurewebsites.net/odata';
