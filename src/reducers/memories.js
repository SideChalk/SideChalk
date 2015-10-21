import Immutable from 'immutable';
import { createReducer } from 'utils';
import { RECEIVE_MEMORY, REMOVE_MEMORY } from 'constants/ActionTypes.js';

const initialState = Immutable.List();
export default createReducer(initialState, {
  [RECEIVE_MEMORY] : receiveMemory,
  [REMOVE_MEMORY] : removeMemory
});

function receiveMemory(memories, memory) {
  return _sortByDistance(memories.push(memory));
}

function removeMemory(memories, key) {
  memories.filter(memory => memory.get('key') !== key );
}

function _sortByDistance(collection) {
  return collection.sort((a, b) => a.distance - b.distance);
}
