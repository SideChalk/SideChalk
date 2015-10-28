import { createConstants } from 'utils';

export default createConstants(
  'RECEIVE_MEMORY',
  'REMOVE_MEMORY',
  'SEND_MEMORY',
  'INITIALIZE_MEMORIES',
  'LOADED_MEMORIES',

  'SET_USER_LOCATION',
  'UPDATE_USER_LOCATION',
  'LOCATION_ERROR',

  'CHECK_AUTH',

  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAIL',
  'TOGGLE_LOGIN_MODAL',

  'LOGOUT',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAIL',

  'SHOW_MEMORY_DETAILS',
  'DISMISS_MEMORY_DETAILS'
);
