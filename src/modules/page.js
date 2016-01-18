import fetch from 'lib/fetch';

export const LOAD_PAGE_LOADING = 'LOAD_PAGE_LOADING';
export const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS';
export const LOAD_PAGE_ERROR = 'LOAD_PAGE_ERROR';
export const UNLOAD_PAGE = 'UNLOAD_PAGE';

const initialState = {
  isLoading: false,
  content: '',
  title: '',
  error: null,
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
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case LOAD_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: action.content,
        title: action.title,
      };
    case UNLOAD_PAGE:
      return {
        ...state,
        content: '',
        title: '',
        error: null,
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
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_PAGE_LOADING,
      });
      const res = await fetch.get(`content/${pageId}`);
      const { content, title } = res.body;
      return dispatch({
        type: LOAD_PAGE_SUCCESS,
        content,
        title,
      });
    } catch (error) {
      return dispatch({
        type: LOAD_PAGE_ERROR,
        error,
      });
    }
  };
}
