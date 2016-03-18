import {
  FIND_RESOURCE_ONE_REQUEST,
  FIND_RESOURCE_ONE_SUCCESS,
  FIND_RESOURCE_ONE_ERROR,
  UPDATE_RESOURCE_REQUEST,
  UPDATE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_ERROR,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_ERROR,
  START_EDIT_RESOURCE,
  STOP_EDIT_RESOURCE,
  EDIT_RESOURCE,
} from 'constants/resource';

const initialState = {
  resource: null,
  resourceId: '',
  identifier: '',
  isRequesting: false,
  isLoaded: false,
  schema: null,
  fieldGroup: null,
  errorMessage: '',
  isEditing: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FIND_RESOURCE_ONE_REQUEST:
      return {
        ...state,
        isRequesting: true,
        errorMessage: '',
        identifier: null,
        resourceId: null,
        resource: null,
        fieldGroup: null,
        schema: null,
        isLoaded: false,
      };
    case FIND_RESOURCE_ONE_SUCCESS: {
      const {
        resource,
        fieldGroup,
        schema,
        identifier,
        resourceId,
      } = action.payload;
      return {
        ...state,
        isRequesting: false,
        identifier,
        resourceId,
        resource,
        fieldGroup,
        schema,
        isLoaded: true,
      };
    }
    case FIND_RESOURCE_ONE_ERROR: {
      const { error } = action.payload;
      console.log(error); // eslint-disable-line
      return {
        ...state,
        errorMessage: 'Error occurs',
      };
    }
    case EDIT_RESOURCE: {
      const {
        field,
        value,
      } = action.payload;
      const { resource } = state;
      resource[field] = value;
      return {
        ...state,
        resource,
      };
    }
    case UPDATE_RESOURCE_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        isRequesting: false,
      };
    case UPDATE_RESOURCE_ERROR:
      if (__DEV__) {
        console.log(error); // eslint-disable-line
      }
      return {
        ...state,
        isRequesting: false,
        errorMessage: 'Error occurs in during update',
      };
    case DELETE_RESOURCE_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        isRequesting: false,
      };
    case DELETE_RESOURCE_ERROR:
      if (__DEV__) {
        console.log(error); // eslint-disable-line
      }
      return {
        ...state,
        isRequesting: false,
        errorMessage: 'Error occurs in during delete',
      };
    case START_EDIT_RESOURCE: {
      return {
        ...state,
        isEditing: true,
      };
    }
    case STOP_EDIT_RESOURCE: {
      return {
        ...state,
        isEditing: false,
      };
    }
    default:
      return state;
  }
}
