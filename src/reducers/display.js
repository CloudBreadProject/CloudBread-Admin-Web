import * as displayType from 'constants/display';

export const initialState = {
  isLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case displayType.SHOW_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case displayType.HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
