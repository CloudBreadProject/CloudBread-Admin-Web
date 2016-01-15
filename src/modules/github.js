import { canUseDOM } from 'lib/env';
import fetch from 'lib/fetch';

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
        isLoading: true,
      };
    case GET_STAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stars: action.payload.body,
      };
    case GET_STAR_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function getStars() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_STAR_LOADING,
      });
      const res = await fetch.get('https://api.github.com/repos/Beingbook/react-isomorphic-starter-kit/stargazers');
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
