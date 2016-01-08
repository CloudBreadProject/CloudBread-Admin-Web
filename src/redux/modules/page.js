import { canUseDOM } from '../../lib/env';
import fetch from '../../lib/fetch';

export const LOAD_PAGE = 'LOAD_PAGE';
export const LOAD_PAGE_LOADING = 'LOAD_PAGE_LOADING';
export const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS';
export const LOAD_PAGE_ERROR = 'LOAD_PAGE_ERROR';

const initialState = {
  loading: false,
  content: '',
  title: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAGE_LOADING:
    return {
      ...state,
      loading: true,
      title: '',
      content: '',
    };
    case LOAD_PAGE_ERROR:
    return {
      ...state,
      loading: false,
    };
    case LOAD_PAGE_SUCCESS:
    const { content, title } = action.payload.body;
    return {
      ...state,
      loading: false,
      content,
      title,
    };
    default:
    return state;
  }
}

export function loadPage(pageId) {
  return {
    type: LOAD_PAGE,
    payload: {
      promise: fetch.get(`content/${pageId}`),
    },
  };
}

export function loadPageS({ pageId }) {
  return async (dispatch) => {
    try {
      const res = await fetch.get(`content/${pageId}`);
      if (res.error) {
        throw res.error;
      }
      dispatch({
        type: LOAD_PAGE_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: LOAD_PAGE_ERROR,
        error,
      });
    }
  };
}
