import { createConstants } from 'utils';

export default createConstants(
  'RECEIVE_MEMORY',
  'REMOVE_MEMORY',
  'SEND_MEMORY',

  'SET_USER_LOCATION',
  'UPDATE_USER_LOCATION',

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
