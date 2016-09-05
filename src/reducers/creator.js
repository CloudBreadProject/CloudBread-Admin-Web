import {
  CREATE_RESOURCE_FORM_REQUEST,
  CREATE_RESOURCE_FORM_SUCCESS,
  CREATE_RESOURCE_FORM_ERROR,
  INSERT_RESOURCE,
  CREATE_RESOURCE_REQUEST,
  CREATE_RESOURCE_SUCCESS,
  CREATE_RESOURCE_ERROR,
  START_CREATE_RESOURCE,
  STOP_CREATE_RESOURCE,
} from 'constants/resource';

const initialState = {
  resource: null,
  resourceId: '',
  isRequesting: false,
  isLoaded: false,
  createSchema: null,
  fieldGroup: null,
  errorMessage: '',
  isCreating: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_RESOURCE_FORM_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        errorMessage: '',
        resourceId: null,
        fieldGroup: null,
        createSchema: null,
        isLoaded: false,
      };
    }
    case CREATE_RESOURCE_FORM_SUCCESS: {
      const {
        resource,
        createFieldGroup,
        createSchema,
        createSchemaArray,
        resourceId,
        } = action.payload;
      return {
        ...state,
        isRequesting: false,
        resourceId,
        resource,
        createFieldGroup,
        createSchema,
        createSchemaArray,
        isLoaded: true,
      };
    }
    case CREATE_RESOURCE_FORM_ERROR: {
      const { error } = action.payload;
      console.log(error); // eslint-disable-line
      return {
        ...state,
        errorMessage: 'Error occurs',
      };
    }
    case INSERT_RESOURCE: {
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
    case CREATE_RESOURCE_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case CREATE_RESOURCE_SUCCESS:
      return {
        ...state,
        isRequesting: false,
      };
    case CREATE_RESOURCE_ERROR:
      if (__DEV__) {
        const { error } = action.payload;
        console.log(error); // eslint-disable-line
        throw new Error(error);
      }
      return {
        ...state,
        isRequesting: false,
        errorMessage: 'Error occurs in during create',
      };
    case START_CREATE_RESOURCE: {
      return {
        ...state,
        isCreating: true,
      };
    }
    case STOP_CREATE_RESOURCE: {
      return {
        ...state,
        isCreating: false,
      };
    }
    default:
      return state;
  }
}
