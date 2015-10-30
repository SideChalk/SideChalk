import Immutable, { fromJS } from 'immutable';
import { createReducer } from 'utils';
import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY, INITIALIZE_MEMORIES, RATE_MEMORY, UNRATE_MEMORY } from 'constants/ActionTypes.js';

/* eslint new-cap: [1, {"capIsNewExceptions": ["Immutable.List"]}] */
const initialState = Immutable.List();

export default createReducer(initialState, {
  [RECEIVE_MEMORY] : receiveMemory,
  [REMOVE_MEMORY]  : removeMemory,
  [INITIALIZE_MEMORIES]  : initializeMemories,
  [RATE_MEMORY]  : rateMemory,
  [UNRATE_MEMORY]  : unrateMemory,
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
  const sortedMemories =
    memories
    .filter(memory => !!memory)
    .sort((a, b) => a.distance - b.distance);

  return state.merge(sortedMemories);
}

function rateMemory(state, payload) {
  const {key, reaction} = payload;
  const [idx, memory] = state.findEntry(mem => mem.get('key') === key);
  const count = memory.getIn(['reactions', reaction]) || 0;

  return state.setIn([idx, 'reactions', reaction], count + 1);
}

function unrateMemory(state, payload) {
  const {key, reaction} = payload;
  const [idx, memory] = state.findEntry(mem => mem.get('key') === key);
  const count = memory.getIn(['reactions', reaction]) || 1;

  return state.setIn([idx, 'reactions', reaction], count - 1);
}
function _sortByDistance(collection) {
  return collection.sort((a, b) => a.get('distance') - b.get('distance'));
}
