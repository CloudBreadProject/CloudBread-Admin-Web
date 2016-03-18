import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  SIGNOUT,
} from 'constants/user';

export function authenticate() {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE_REQUEST,
    });
    // @TODO real authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: AUTHENTICATE_SUCCESS,
          payload: {
            accessToken: 'fewfewfwefwefwefwewfoiwemfoweifmweokfmowieanweoaifnwei',
          },
        });
        resolve();
      }, 1000);
    });
  };
}

export function signout() {
  return {
    type: SIGNOUT,
  };
}
