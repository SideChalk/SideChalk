import Immutable, { fromJS } from 'immutable';
import { createReducer } from 'utils';
import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY, INITIALIZE_MEMORIES } from 'constants/ActionTypes.js';

/* eslint new-cap: [1, {"capIsNewExceptions": ["Immutable.List"]}] */
const initialState = Immutable.List();

export default createReducer(initialState, {
  [RECEIVE_MEMORY] : receiveMemory,
  [REMOVE_MEMORY]  : removeMemory,
  [INITIALIZE_MEMORIES]  : initializeMemories,
  [SEND_MEMORY]    : (state) => state
});

function receiveMemory(memories, memory) {
  return _sortByDistance(memories.push(fromJS(memory)));
}

function removeMemory(memories, key) {
  return memories.filter(memory => {
    return memory.get('key') !== key;
  });
}

function initializeMemories(state, memories) {
  const sortedMemories = memories.sort((a, b)=> a.distance - b.distance);
  return state.merge(sortedMemories);
}

function _sortByDistance(collection) {
  return collection.sort((a, b) => a.get('distance') - b.get('distance'));
}
