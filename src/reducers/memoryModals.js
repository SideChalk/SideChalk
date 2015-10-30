import Immutable from 'immutable';
import { createReducer } from 'utils';
import { SHOW_MEMORY_DETAILS, DISMISS_MEMORY_DETAILS,
         CREATE_TEXT_MEMORY, CREATE_MUSIC_MEMORY, CREATE_DRAWING_MEMORY,
         DISMISS_CREATE_MEMORY } from 'constants/ActionTypes.js';
const initialState = Immutable.fromJS({
  showMemoryModal: false,
  memoryInFocus: null
});

export default createReducer(initialState, {
  [SHOW_MEMORY_DETAILS] : showMemoryDetails,
  [DISMISS_MEMORY_DETAILS] : dismissMemoryDetails,
  [CREATE_TEXT_MEMORY] : createTextMemory,
  [CREATE_MUSIC_MEMORY] : createMusicMemory,
  [CREATE_DRAWING_MEMORY] : createDrawingMemory,
  [DISMISS_CREATE_MEMORY] : dismissCreateMemory
});


function showMemoryDetails(state, memory) {
  return state.merge({
    showMemoryModal: true,
    memoryInFocus: memory
  });
}

function dismissMemoryDetails(state) {
  return state.merge({
    showMemoryModal: false,
    memoryInFocus: null
  });
}

function createTextMemory(state) {
  return state.merge({
    modalType: 'text'
  });
}

function createMusicMemory(state) {
  return state.merge({
    modalType: 'music'
  });
}

function createDrawingMemory(state) {
  return state.merge({
    modalType: 'drawing'
  });
}

function dismissCreateMemory(state) {
  return state.merge({
    modalType: 'hide'
  });
}
