import {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_SNACKBAR_MESSAGE,
  HIDE_SNACKBAR_MESSAGE,
  UPDATE_TIMEZONE,
  defaultSnackbarShowDuration,
} from 'constants/display';

const initialState = {
  snackbarMessage: '',
  snackbarDuration: defaultSnackbarShowDuration,
  snackbarAction: '',
  snackbarActionHandler: null,
  snackbarOpen: false,
  isLoading: false,
  timezone: 'Asia/Seoul',
};

export default function reducer(state = initialState, action = {}) {
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
    case SHOW_SNACKBAR_MESSAGE: {
      const {
        snackbarMessage,
        snackbarDuration,
        snackbarAction,
        snackbarActionHandler,
      } = action.payload || {};
      return {
        ...state,
        snackbarMessage,
        snackbarDuration,
        snackbarAction,
        snackbarActionHandler,
        snackbarOpen: true,
      };
    }
    case HIDE_SNACKBAR_MESSAGE:
      return {
        ...state,
        snackbarMessage: '',
        snackbarDuration: defaultSnackbarShowDuration,
        snackbarAction: '',
        snackbarActionHandler: null,
        snackbarOpen: false,
      };
    case UPDATE_TIMEZONE: {
      const { timezone } = action.payload;
      return {
        ...state,
        timezone,
      };
    }
    default:
      return state;
  }
}
