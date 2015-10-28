import { SHOW_MEMORY_DETAILS, DISMISS_MEMORY_DETAILS,
         CREATE_TEXT_MEMORY, CREATE_MUSIC_MEMORY, CREATE_DRAWING_MEMORY,
         DISMISS_CREATE_MEMORY } from 'constants/ActionTypes.js';

export function showMemoryDetails(key) {
  return {
    type: SHOW_MEMORY_DETAILS,
    payload: key
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
