import { canUseDOM } from '../../lib/env';
import fetch from '../../lib/fetch';

export const GET_STAR = 'GET_STAR';
export const GET_STAR_LOADING = 'GET_STAR_LOADING';
export const GET_STAR_SUCCESS = 'GET_STAR_SUCCESS';
export const GET_STAR_ERROR = 'GET_STAR_ERROR';

const initialState = {
  isLoading: false,
  stars: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_STAR_LOADING:
      return {
        ...state,
      };
    case GET_STAR_SUCCESS:
      const stars = state.stars.concat(action.payload.body);
      return {
        ...state,
        stars,
      };
    case GET_STAR_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function getStars() {
  const reqPromise = fetch.get('https://api.github.com/repos/Beingbook/react-isomorphic-starter-kit/stargazers');

  if (canUseDOM) {
    return {
      type: GET_STAR,
      payload: {
        promise: reqPromise,
      },
    };
  }

  return async (dispatch) => {
    try {
      const res = await reqPromise;
      if (res.error) {
        throw res.error;
      }
      dispatch({
        type: GET_STAR_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: GET_STAR_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}
