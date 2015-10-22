import { combineReducers } from 'redux';
import memories from './memories';
import location from './location';
import auth from './auth';

export default combineReducers({
  memories,
  location,
  auth
});
