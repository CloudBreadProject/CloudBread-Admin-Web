import fetch from 'core/fetch';
import * as models from 'models';
import { canUseDOM } from 'core/env';
import {
  FIND_RESOURCES_REQUEST,
  FIND_RESOURCES_SUCCESS,
  FIND_RESOURCES_ERROR,
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
  START_FIND_RESOURCE,
  STOP_FIND_RESOURCE,
  EDIT_RESOURCE,
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

export function loadResources({
  resourceId, // target resource

  // search relate props
  fromDate, toDate, // resource date range
  field, search, // field and word to search resource
  sort, // sorting
  skip, limit, // paging

  needClear,
  }) {
  return async dispatch => {
    try {
      let $filter = '';
      const $orderBy = sort || 'CreatedAt asc';
      const $skip = skip || 0;
      const $top = limit || 30;
      function addCondition(condition) { // eslint-disable-line no-inner-declarations
        if ($filter) {
          $filter += ' and ';
        }
        $filter += condition;
      }
      if (fromDate) {
        addCondition(`CreatedAt ge datetimeoffset'${fromDate}'`);
      }
      if (toDate) {
        addCondition(`CreatedAt le datetimeoffset'${toDate}'`);
      }
      if (search && field) {
        addCondition(`${field} eq '${search}'`);
      }
      let query = `$orderby=${$orderBy}&$skip=${$skip}&$top=${$top}`;
      if ($filter) {
        query += `&$filter=${$filter}`;
      }
      dispatch({
        type: FIND_RESOURCES_REQUEST,
        payload: {
          field, search,
          fromDate, toDate,
          sort,
          resourceId,
          needClear,
        },
      });
      const res = await fetch.get(`/${resourceId}?$inlinecount=allpages&${query}`);
      const model = models[resourceId];
      const showFields = [];
      model.showFields.forEach(showField => {
        showFields.push(model.schema[showField]);
      });
      const {
        title,
        description,
        primaryKey,
        searchFields,
        } = model;
      dispatch({
        type: FIND_RESOURCES_SUCCESS,
        payload: {
          allArticles: res.body['odata.count'],
          resources: res.body.value,
          showFields,
          primaryKey,
          title,
          description,
          searchFields,
        },
      });
    } catch (error) {
      dispatch({
        type: FIND_RESOURCES_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}

export function loadResource({ identifier, resourceId }) {
  return async dispatch => {
    try {
      const model = models[resourceId];
      const {
        schema,
        schemaArray,
        fieldGroup,
        } = model;
      dispatch({
        type: FIND_RESOURCE_ONE_REQUEST,
      });
      const res = await fetch.get(`/${resourceId}('${identifier}')`);
      dispatch({
        type: FIND_RESOURCE_ONE_SUCCESS,
        payload: {
          resource: res.body,
          identifier,
          resourceId,
          fieldGroup,
          schema,
          schemaArray,
        },
      });
    } catch (error) {
      dispatch({
        type: FIND_RESOURCE_ONE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}

export function editResource({ field, value }) {
  return {
    type: EDIT_RESOURCE,
    payload: {
      field,
      value,
    },
  };
}

export function updateResource({ resourceId, identifier, resource }) {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_RESOURCE_REQUEST,
      });
      await fetch.patch(`/${resourceId}('${identifier}')`, {
        data: resource,
      });
      dispatch({
        type: UPDATE_RESOURCE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}

export function deleteResource({ resourceId, identifier }) {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_RESOURCE_REQUEST,
      });
      await fetch.del(`/${resourceId}('${identifier}')`);
      dispatch({
        type: DELETE_RESOURCE_SUCCESS,
        payload: {
          resourceId,
          identifier,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}

export function startEditingResource() {
  if (canUseDOM) {
    return async dispatch => {
      dispatch({
        type: START_EDIT_RESOURCE,
      });
    };
  }
  return {
    type: START_EDIT_RESOURCE,
  };
}

export function stopEditingResource() {
  if (canUseDOM) {
    return async dispatch => {
      dispatch({
        type: STOP_EDIT_RESOURCE,
      });
    };
  }
  return {
    type: STOP_EDIT_RESOURCE,
  };
}

export function startFindingResource() {
  if (canUseDOM) {
    return async dispatch => {
      dispatch({
        type: START_FIND_RESOURCE,
      });
    };
  }
  return {
    type: START_FIND_RESOURCE,
  };
}

export function stopFindingResource() {
  if (canUseDOM) {
    return async dispatch => {
      dispatch({
        type: STOP_FIND_RESOURCE,
      });
    };
  }
  return {
    type: STOP_FIND_RESOURCE,
  };
}

export function startCreatingResource() {
  if (canUseDOM) {
    return async dispatch => {
      dispatch({
        type: START_CREATE_RESOURCE,
      });
    };
  }
  return {
    type: START_CREATE_RESOURCE,
  };
}

export function stopCreatingResource() {
  if (canUseDOM) {
    return async dispatch => {
      dispatch({
        type: STOP_CREATE_RESOURCE,
      });
    };
  }
  return {
    type: STOP_CREATE_RESOURCE,
  };
}


export function loadCreateResourceForm({ resourceId }) {
  return async dispatch => {
    try {
      const model = models[resourceId];
      const {
        createSchema,
        createSchemaArray,
        createFieldGroup,
        } = model;
      dispatch({
        type: CREATE_RESOURCE_FORM_REQUEST,
      });
      let resource = {};
      for (const key in createSchema) {
        if(createSchema[key].boolean) {
          resource[key] = "N";
        } else {
          resource[key] = "";
        }
      }
      dispatch({
        type: CREATE_RESOURCE_FORM_SUCCESS,
        payload: {
          resource,
          resourceId,
          createFieldGroup,
          createSchema,
          createSchemaArray,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_RESOURCE_FORM_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}

export function insertResource({ field, value }) {
  return {
    type: INSERT_RESOURCE,
    payload: {
      field,
      value,
    },
  };
}

export function createResource({ resourceId, resource }) {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_RESOURCE_REQUEST,
      });
      console.log('======================================');
      console.log('resource');
      console.log(resource);
      console.log('======================================');
      await fetch.post(`/${resourceId}`, {
        data: resource,
      });
      dispatch({
        type: CREATE_RESOURCE_SUCCESS,
      });
    } catch (error) {
      console.log('======================================');
      console.log('error');
      console.log(error);
      console.log('======================================');
      dispatch({
        type: CREATE_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}
