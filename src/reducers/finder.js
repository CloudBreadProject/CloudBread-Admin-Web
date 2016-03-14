import fetch from 'lib/fetch';
import * as models from 'models';

const initialState = {
  resourceId: '',
  resources: [],
  showFields: [],
  primaryKey: '',
  showResources: 20,
  allArticles: 0,
  isRequesting: false,
  isLoaded: false,
  errorMessage: '',
  title: '',
  description: '',
};

export const LOAD_RESOURCE_REQUEST = 'LOAD_RESOURCE_REQUEST';
export const LOAD_RESOURCE_SUCCESS = 'LOAD_RESOURCE_SUCCESS';
export const LOAD_RESOURCE_ERROR = 'LOAD_RESOURCE_ERROR';

export default function reducer(state = initialState, action = {}) {
  const {
    resourceId,
    showFields,
    error,
    resources,
    allArticles,
    title,
    description,
    primaryKey,
  } = action.payload || {};
  switch (action.type) {
    case LOAD_RESOURCE_REQUEST:
      return {
        ...state,
        isRequesting: true,
        resourceId,
        resources: [],
        showFields,
        allArticles: 0,
        title,
        description,
        primaryKey,
      };
    case LOAD_RESOURCE_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        resources,
        allArticles: parseInt(allArticles, 10),
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
      const model = models[resourceId];
      const showFields = [];
      model.showFields.forEach(showField => {
        showFields.push(model.schema[showField]);
      });
      const {
        title,
        description,
        primaryKey,
      } = model;
      dispatch({
        type: LOAD_RESOURCE_REQUEST,
        payload: {
          resourceId,
          showFields,
          primaryKey,
          title,
          description,
        },
      });
      const res = await fetch.get(`/${resourceId}?$inlinecount=allpages&$top=30`);
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
