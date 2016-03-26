import {
  GET_STAR_LOADING,
  GET_STAR_SUCCESS,
  GET_STAR_ERROR,
} from 'constants/github';

export const initialState = {
  isLoading: false,
  stars: [],
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_STAR_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
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
