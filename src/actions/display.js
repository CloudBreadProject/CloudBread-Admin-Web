import {
  SHOW_SNACKBAR_MESSAGE,
  HIDE_SNACKBAR_MESSAGE,
  SHOW_LOADING,
  HIDE_LOADING,
  UPDATE_TIMEZONE,
  defaultSnackbarShowDuration,
} from 'constants/display';

export function showSnackbarMessage({
  snackbarMessage,
  snackbarDuration = defaultSnackbarShowDuration,
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

export function updateTimezone(timezone) {
  return {
    type: UPDATE_TIMEZONE,
    payload: {
      timezone,
    },
  };
}
