import Immutable from 'immutable';
import { createReducer } from 'utils';
import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY } from 'constants/ActionTypes.js';

/* eslint new-cap: [1, {"capIsNewExceptions": ["Immutable.List"]}] */
const initialState = Immutable.List();

export default createReducer(initialState, {
  [RECEIVE_MEMORY] : receiveMemory,
  [REMOVE_MEMORY]  : removeMemory,
  [SEND_MEMORY]    : (state) => state
});

function receiveMemory(memories, memory) {
  return _sortByDistance(memories.push(memory));
}

function removeMemory(memories, key) {
  return memories.filter(memory => memory.get('key') !== key );
}

function _sortByDistance(collection) {
  return collection.sort((a, b) => a.distance - b.distance);
}
