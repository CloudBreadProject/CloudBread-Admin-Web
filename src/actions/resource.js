import fetch from 'lib/fetch';
import * as models from 'models';
import { canUseDOM } from 'lib/env';
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
  EDIT_RESOURCE,
} from 'constants/resource';

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
        type: FIND_RESOURCES_REQUEST,
      });
      const res = await fetch.get(`/${resourceId}?$inlinecount=allpages&$top=30`);
      dispatch({
        type: FIND_RESOURCES_SUCCESS,
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

export function startEditing() {
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

export function stopEditing() {
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
