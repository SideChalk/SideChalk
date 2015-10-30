import { SHOW_MEMORY_DETAILS, DISMISS_MEMORY_DETAILS,
         CREATE_TEXT_MEMORY, CREATE_MUSIC_MEMORY, CREATE_DRAWING_MEMORY,
         DISMISS_CREATE_MEMORY } from 'constants/ActionTypes.js';

import { memoriesRef } from 'actions/firebaseVars.js';

export function showMemoryDetails(oldMemory) {
  return (dispatch) => {
    memoriesRef
      .child(oldMemory.key)
      .once('value', (snapshot) => {
        const memory = {...snapshot.val(), key: oldMemory.key, location: oldMemory.location, distance: oldMemory.distance};
        dispatch(_receiveMemory(memory));
      });
  };
}

function _receiveMemory(memory) {
  return {
    type: SHOW_MEMORY_DETAILS,
    payload: memory
  };
}

export function dismissMemoryDetails() {
  return {
    type: DISMISS_MEMORY_DETAILS
  };
}
export function createMemory(memoryType) {
  return {
    type: _mapMemoryTypeToAction(memoryType)
    // payload: newMemory
  };
}

function _mapMemoryTypeToAction(memoryType) {
  if (memoryType === 'text') {
    return CREATE_TEXT_MEMORY;
  }
  if (memoryType === 'music') {
    return CREATE_MUSIC_MEMORY;
  }
  if (memoryType === 'drawing') {
    return CREATE_DRAWING_MEMORY;
  }
}

export function dismissCreateMemory() {
  return {
    type: DISMISS_CREATE_MEMORY
  };
}
