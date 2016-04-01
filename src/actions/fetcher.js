import {
  SET_API_ENDPOINT,
} from 'constants/fetcher';

export function setApiEndpoint(apiEndpoint) {
  return {
    type: SET_API_ENDPOINT,
    payload: {
      apiEndpoint,
    },
  };
}
