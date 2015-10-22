import Immutable from 'immutable';
import { createReducer } from 'utils';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL } from 'constants/ActionTypes.js';

/* eslint new-cap: [1, {"capIsNewExceptions": ["Immutable.Map"]}] */
const initialState = Immutable.Map({
  uid: null,
  displayName: null
});

export default createReducer(initialState, {
  [LOGIN]         : login,
  [LOGIN_SUCCESS] : loginSucces,
  [LOGIN_FAIL]    : loginFail,

  [LOGOUT]        : logout,
  [LOGOUT_SUCCESS]: logoutSuccess,
  [LOGOUT_FAIL]   : logoutFail
});

function login(state) {
  return state.merge({
    loggingIn: true
  });
}

function loginSucces(state, loginInfo) {
  return state.merge({
    ...loginInfo,
    error: null,
    loggingIn: false
  });
}

function loginFail(state, error) {
  return state.merge({
    error: error,
    loggingIn: false
  });
}

function logout(state) {
  return state.merge({
    loggingOut: true
  });
}

function logoutSuccess(state) {
  return state.merge({
    loggingOut: false,
    uid: null,
    displayName: null
  });
}

function logoutFail(state, error) {
  return state.merge({
    error: error,
    loggingOut: false
  });
}
