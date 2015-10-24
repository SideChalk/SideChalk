import { combineReducers } from 'redux';
import memories from './memories';
import location from './location';
import auth from './auth';
import memoryModals from './memoryModals';

export default combineReducers({
  memories,
  location,
  auth,
  memoryModals
});
