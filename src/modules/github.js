import fetch from 'lib/fetch';

export const GITHUB_API_STARS = 'https://api.github.com/repos/Beingbook/react-universal-starter-kit/stargazers';

export const GET_STAR = 'GET_STAR';
export const GET_STAR_LOADING = 'GET_STAR_LOADING';
export const GET_STAR_SUCCESS = 'GET_STAR_SUCCESS';
export const GET_STAR_ERROR = 'GET_STAR_ERROR';

export const initialState = {
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
        stars: action.stars,
      };
    case GET_STAR_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
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
      const res = await fetch.get(GITHUB_API_STARS);
      if (res.error) {
        throw res.error;
      }
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
