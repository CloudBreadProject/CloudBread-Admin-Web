import fetch from 'core/fetch';

import {
  GET_STAR_LOADING,
  GET_STAR_SUCCESS,
  GET_STAR_ERROR,
} from 'constants/github';

export const GITHUB_API_STARS = 'https://api.github.com/repos/Beingbook/react-universal-starter-kit/stargazers';

export function getStars() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_STAR_LOADING,
      });
      const res = await fetch.get(GITHUB_API_STARS);
      return dispatch({
        type: GET_STAR_SUCCESS,
        stars: res.body,
      });
    } catch (error) {
      return dispatch({
        type: GET_STAR_ERROR,
        error,
      });
    }
  };
}
