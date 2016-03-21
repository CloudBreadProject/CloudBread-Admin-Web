const initialState = {
  resourceId: '',
  resources: [],
  showFields: [],
  primaryKey: '',
  showResources: 20,
  allArticles: 0,
  isRequesting: false,
  isLoaded: false,
  isFinding: false,
  errorMessage: '',
  title: '',
  description: '',
};

import {
  FIND_RESOURCES_REQUEST,
  FIND_RESOURCES_SUCCESS,
  FIND_RESOURCES_ERROR,
  DELETE_RESOURCE_SUCCESS,
  START_FIND_RESOURCE,
  STOP_FIND_RESOURCE,
} from 'constants/resource';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FIND_RESOURCES_REQUEST:
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
    case FIND_RESOURCES_SUCCESS: {
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
    case FIND_RESOURCES_ERROR: {
      const { error } = action.payload;
      console.log(error); // eslint-disable-line
      return {
        ...state,
        isRequesting: false,
        errorMessage: 'Error occured',
      };
    }
    case DELETE_RESOURCE_SUCCESS: {
      const {
        identifier,
        resourceId,
      } = action.payload || {};
      if (resourceId === state.resourceId) {
        const { resources } = state;
        const removeItem = resources.find(x => x[state.primaryKey] === identifier);
        if (removeItem) {
          state.resources.splice(resources.indexOf(removeItem), 1);
        }
        return {
          ...state,
        };
      }
      return state;
    }
    case START_FIND_RESOURCE: {
      return {
        ...state,
        isFinding: true,
      };
    }
    case STOP_FIND_RESOURCE: {
      return {
        ...state,
        isFinding: false,
      };
    }
    default:
      return state;
  }
}
