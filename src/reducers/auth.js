import Immutable from 'immutable';
import { createReducer } from 'utils';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL, TOGGLE_LOGIN_MODAL } from 'constants/ActionTypes.js';

/* eslint new-cap: [1, {"capIsNewExceptions": ["Immutable.Map"]}] */
const initialState = Immutable.Map({
  uid: null,
  displayName: null,
  showLoginModal: false
});

export default createReducer(initialState, {
  [LOGIN]         : login,
  [LOGIN_SUCCESS] : loginSucces,
  [LOGIN_FAIL]    : loginFail,
  [TOGGLE_LOGIN_MODAL]  : toggleLoginModal,

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
    loggingIn: false,
    showLoginModal: false
  });
}

function loginFail(state, error) {
  return state.merge({
    error: error,
    loggingIn: false
  });
}

function toggleLoginModal(state) {
  return state.merge({
    showLoginModal: !state.get('showLoginModal')
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
