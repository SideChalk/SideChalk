import immutable from 'immutable';

import authReducer from 'reducers/auth.js';

import {
  CHECK_AUTH,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  TOGGLE_LOGIN_MODAL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from 'constants/ActionTypes.js';

describe('auth reducer', () => {
  const initialState = immutable.fromJS({
    uid: null,
    displayName: null,
    showLoginModal: false
  });

  it('should return the initial state', () => {
    const state = authReducer(undefined, {});
    assert( immutable.is(state, initialState) );
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_SUCCESS,
        payload: {
          uid: '123',
          displayName: 'Bob'
        }
      }).toJS()
    ).to.eql({
      uid: '123',
      displayName: 'Bob',
      loggingIn: false,
      error: null,
      showLoginModal: false
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const state = authReducer(initialState, {
      type: LOGIN_SUCCESS,
      payload: {
        uid: '123',
        displayName: 'Bob'
      }
    });
    expect(
      authReducer(state, { type: LOGOUT_SUCCESS }).toJS()
    ).to.eql({
      uid: null,
      displayName: null,
      loggingIn: false,
      loggingOut: false,
      error: null,
      showLoginModal: false
    });
  });
});
