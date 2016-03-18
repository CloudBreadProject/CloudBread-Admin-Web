import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  SIGNOUT,
} from 'constants/user';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  accessToken: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
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
