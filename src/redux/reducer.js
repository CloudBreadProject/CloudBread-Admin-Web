import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import * as modules from './modules';

export default combineReducers({
  routing: routeReducer,
  ...modules,
});
