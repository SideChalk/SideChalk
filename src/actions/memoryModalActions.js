import { SHOW_MEMORY_DETAILS, DISMISS_MEMORY_DETAILS } from 'constants/ActionTypes.js';

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
