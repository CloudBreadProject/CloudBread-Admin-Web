import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as modules from 'reducers';

export default combineReducers({
  routing: routerReducer,
  ...modules,
});
