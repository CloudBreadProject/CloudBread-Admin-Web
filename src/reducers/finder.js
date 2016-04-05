const initialState = {
  // loaded resources
  resources: [],
  allArticles: 0,
  showResources: 20,

  // finder status
  isRequesting: false, // http req
  isLoaded: false,
  isFinding: false,
  failedToLoad: false,
  errorMessage: '',

  // resource schema
  resourceId: '',
  title: '',
  description: '',
  showFields: [],
  primaryKey: '',
  searchFields: [],

  // search
  search: '',
  field: '',
  sort: '',
  fromDate: '',
  toDate: '',
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
    case FIND_RESOURCES_REQUEST: {
      const {
        fromDate, toDate,
        search, field,
        sort,

        resourceId,
        needClear,
      } = action.payload || {};
      return {
        ...state,
        isRequesting: true,
        ...(resourceId === state.resourceId ? {
          // same resource
          resources: needClear ? [] : state.resources,
        } : {
          // different resource
          // load status
          isLoaded: false,
          allArticles: 0,
          resources: [],
          failedToLoad: false,

          // resource schema
          title: '',
          description: '',
          primaryKey: '',
          resourceId,
          showFields: [],

          // search relate props
          searchFields: [],
          search: search || '',
          field: field || '',
          sort: sort || '',
          toDate: toDate || '',
          fromDate: fromDate || '',
        }),
      };
    }
    case FIND_RESOURCES_SUCCESS: {
      const {
        showFields,
        resources,
        allArticles,
        title,
        description,
        primaryKey,
        searchFields,
      } = action.payload;
      return {
        ...state,
        isRequesting: false,
        resources: [
          ...state.resources,
          ...resources,
        ],
        allArticles: parseInt(allArticles, 10),
        title,
        description,
        primaryKey,
        showFields,
        searchFields,
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
        failedToLoad: true,
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
