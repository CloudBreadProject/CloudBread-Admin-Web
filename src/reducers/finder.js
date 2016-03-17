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

export const REMOVE_RESOURCE_ITEM = 'REMOVE_RESOURCE_ITEM';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_RESOURCE_REQUEST:
      return {
        ...state,
        isRequesting: true,
        resources: [],
        allArticles: 0,
        title: '',
        description: '',
        primaryKey: '',
        resourceId: '',
        showFields: [],
        isLoaded: false,
      };
    case LOAD_RESOURCE_SUCCESS: {
      const {
        resourceId,
        showFields,
        resources,
        allArticles,
        title,
        description,
        primaryKey,
      } = action.payload;
      return {
        ...state,
        isRequesting: false,
        resources,
        allArticles: parseInt(allArticles, 10),
        title,
        description,
        primaryKey,
        resourceId,
        showFields,
        isLoaded: true,
      };
    }
    case LOAD_RESOURCE_ERROR: {
      const { error } = action.payload;
      console.log(error); // eslint-disable-line
      return {
        ...state,
        isRequesting: false,
        errorMessage: 'Error occured',
      };
    }
    case REMOVE_RESOURCE_ITEM: {
      const { identifier } = action.payload;
      const { resources } = state;
      const removeItem = resources.find(x => x[state.primaryKey] === identifier);
      state.resources.splice(resources.indexOf(removeItem), 1);
      return {
        ...state,
      };
    }
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
      });
      const res = await fetch.get(`/${resourceId}?$inlinecount=allpages&$top=30`);
      dispatch({
        type: LOAD_RESOURCE_SUCCESS,
        payload: {
          allArticles: res.body['odata.count'],
          resources: res.body.value,
          resourceId,
          showFields,
          primaryKey,
          title,
          description,
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

export function removeResourceItem(identifier) {
  return {
    type: REMOVE_RESOURCE_ITEM,
    payload: {
      identifier,
    },
  };
}
