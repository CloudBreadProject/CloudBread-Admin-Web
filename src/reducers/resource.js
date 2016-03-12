import fetch from 'lib/fetch';

const initialState = {
  resourceId: '',
  resources: [],
  showFields: [],
  showResources: 2,
  allArticles: 0,
  isRequesting: false,
  errorMessage: '',
};

export const LOAD_RESOURCE_REQUEST = 'LOAD_RESOURCE_REQUEST';
export const LOAD_RESOURCE_SUCCESS = 'LOAD_RESOURCE_SUCCESS';
export const LOAD_RESOURCE_ERROR = 'LOAD_RESOURCE_ERROR';

export default function reducer(state = initialState, action = {}) {
  const {
    resourceId,
    error,
    resources,
    allArticles,
  } = action.payload || {};
  switch (action.type) {
    case LOAD_RESOURCE_REQUEST:
      return {
        ...state,
        isRequesting: true,
        resourceId,
        resources: [],
        showFields: [],
        allArticles: 0,
      };
    case LOAD_RESOURCE_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        resources,
        allArticles,
      };
    case LOAD_RESOURCE_ERROR:
      console.log(error); // eslint-disable-line
      return {
        ...state,
        isRequesting: false,
        errorMessage: 'Error occured',
      };
    default:
      return state;
  }
}

export function loadResources({ resourceId }) {
  return async dispatch => {
    try {
      dispatch({
        type: LOAD_RESOURCE_REQUEST,
        payload: {
          resourceId,
        },
      });
      const res = await fetch.get(`/${resourceId}?$inlinecount=allpages&$top=2`);
      dispatch({
        type: LOAD_RESOURCE_SUCCESS,
        payload: {
          allArticles: res.body['odata.count'],
          resources: res.body.value,
        },
      });
    } catch (error) {
      dispatch({
        type: LOAD_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}
