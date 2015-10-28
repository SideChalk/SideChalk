import { combineReducers } from 'redux-immutablejs';
import memories from './memories';
import location from './location';
import auth from './auth';
import memoryModals from './memoryModals';
import loadingMemories from './loadingMemories';
import locationError from './locationError';

export default combineReducers({
  memories,
  location,
  auth,
  memoryModals,
  loadingMemories,
  locationError
});
