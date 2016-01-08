import { canUseDOM } from '../../lib/env';
import fetch from '../../lib/fetch';

export const LOAD_PAGE = 'LOAD_PAGE';
export const LOAD_PAGE_LOADING = 'LOAD_PAGE_LOADING';
export const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS';
export const LOAD_PAGE_ERROR = 'LOAD_PAGE_ERROR';
export const UNLOAD_PAGE = 'UNLOAD_PAGE';

const initialState = {
  isLoading: false,
  content: '',
  title: '',
  error: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAGE_LOADING:
      return {
        ...state,
        isLoading: true,
        title: '',
        content: '',
        error: '',
      };
    case LOAD_PAGE_ERROR:
      const { error } = action.payload.error;
      return {
        ...state,
        isLoading: false,
        error,
      };
    case LOAD_PAGE_SUCCESS:
      const { content, title } = action.payload.body;
      return {
        ...state,
        isLoading: false,
        content,
        title,
      };
    case UNLOAD_PAGE:
      return {
        ...state,
        content: '',
        title: '',
        error: '',
      };
    default:
      return state;
  }
}

export function unloadPage() {
  return {
    type: UNLOAD_PAGE,
  };
}

export function loadPage({ pageId }) {
  const reqPromise = fetch.get(`content/${pageId}`);
  if (canUseDOM) {
    return {
      type: LOAD_PAGE,
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
        type: LOAD_PAGE_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: LOAD_PAGE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}
