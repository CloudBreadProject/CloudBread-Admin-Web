import {
  SET_API_ENDPOINT,
} from 'constants/fetcher';

export const initialState = {
  apiEndpoint: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_API_ENDPOINT: {
      const { apiEndpoint } = action.payload;
      return {
        ...state,
        apiEndpoint,
      };
    }
    default:
      return state;
  }
}
