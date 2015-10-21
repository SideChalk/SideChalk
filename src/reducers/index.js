import { combineReducers } from 'redux';
import memories from './memories';
import location from './location';

export default combineReducers({
  memories,
  location,
});
