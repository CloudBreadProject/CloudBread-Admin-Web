import {
  LOAD_PAGE_LOADING,
  LOAD_PAGE_ERROR,
  LOAD_PAGE_SUCCESS,
  UNLOAD_PAGE,
} from 'constants/page';

export const initialState = {
  isLoading: false,
  content: '',
  title: '',
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAGE_LOADING: {
      return {
        ...state,
        isLoading: true,
        title: '',
        content: '',
        error: null,
      };
    }
    case LOAD_PAGE_ERROR: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    case LOAD_PAGE_SUCCESS: {
      const { content, title } = action;
      return {
        ...state,
        isLoading: false,
        content,
        title,
      };
    }
    case UNLOAD_PAGE: {
      return {
        ...state,
        content: '',
        title: '',
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
