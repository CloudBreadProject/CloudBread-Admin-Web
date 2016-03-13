const defaultDuration = 4000;

const initialState = {
  snackbarMessage: '',
  snackbarDuration: defaultDuration,
  snackbarAction: '',
  snackbarActionHandler: null,
  snackbarOpen: false,
  isLoading: false,
};

const SHOW_SNACKBAR_MESSAGE = 'SHOW_SNACKBAR_MESSAGE';
const HIDE_SNACKBAR_MESSAGE = 'HIDE_SNACKBAR_MESSAGE';
const SHOW_LOADING = 'SHOW_LOADING';
const HIDE_LOADING = 'HIDE_LOADING';

export default function reducer(state = initialState, action = {}) {
  const {
    snackbarMessage,
    snackbarDuration,
    snackbarAction,
    snackbarActionHandler,
  } = action.payload || {};

  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_SNACKBAR_MESSAGE:
      return {
        ...state,
        snackbarMessage,
        snackbarDuration,
        snackbarAction,
        snackbarActionHandler,
        snackbarOpen: true,
      };
    case HIDE_SNACKBAR_MESSAGE:
      return {
        ...state,
        snackbarMessage: '',
        snackbarDuration: defaultDuration,
        snackbarAction: '',
        snackbarActionHandler: null,
        snackbarOpen: false,
      };
    default:
      return state;
  }
}

export function showSnackbarMessage({
  snackbarMessage,
  snackbarDuration = defaultDuration,
  snackbarAction,
  snackbarActionHandler,
}) {
  return {
    type: SHOW_SNACKBAR_MESSAGE,
    payload: {
      snackbarMessage,
      snackbarDuration,
      snackbarAction,
      snackbarActionHandler,
    },
  };
}

export function hideSnackbarMessage() {
  return {
    type: HIDE_SNACKBAR_MESSAGE,
  };
}

export function showLoading() {
  return {
    type: SHOW_LOADING,
  };
}

export function hideLoading() {
  return {
    type: HIDE_LOADING,
  };
}
