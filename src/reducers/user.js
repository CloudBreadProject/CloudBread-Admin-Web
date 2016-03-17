const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  accessToken: '',
};

const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR';
const AUTHENTICATE_PENDING = 'AUTHENTICATE_PENDING';

const SIGNOUT = 'SINGOUT';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTHENTICATE_PENDING:
      return {
        ...state,
        isAuthenticating: true,
      };
    case AUTHENTICATE_SUCCESS: {
      const { accessToken } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        accessToken,
      };
    }
    case AUTHENTICATE_ERROR:
      return {
        ...state,
        isAuthenticating: false,
      };
    case SIGNOUT:
      return {
        ...state,
        isAuthenticated: false,
        accessToken: '',
      };
    default:
      return state;
  }
}

export function authenticate() {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE_PENDING,
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
