import Immutable from 'immutable';

import { createReducer } from 'utils';
import { SHOW_MEMORY_DETAILS, DISMISS_MEMORY_DETAILS } from 'constants/ActionTypes.js';

const initialState = Immutable.fromJS({
  showMemoryModal: false,
  memoryInFocus: null
});

export default createReducer(initialState, {
  [SHOW_MEMORY_DETAILS] : showMemoryDetails,
  [DISMISS_MEMORY_DETAILS] : dismissMemoryDetails
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
