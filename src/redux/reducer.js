import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import * as modules from 'modules';

export default combineReducers({
  routing: routeReducer,
  ...modules,
});
