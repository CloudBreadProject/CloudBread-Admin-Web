import * as displayType from 'constants/display';

export function showLoading() {
  return {
    type: displayType.SHOW_LOADING,
  };
}

export function hideLoading() {
  return {
    type: displayType.HIDE_LOADING,
  };
}
