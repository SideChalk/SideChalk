import Firebase from 'firebase';
import GeoFire from 'geofire';

import { FIREBASE_ROOT, MEMORY_PATH, LOCATION_PATH } from 'constants/FirebasePaths.js';
import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN } from 'constants/ActionTypes.js';

const baseRef = new Firebase(FIREBASE_ROOT);
const memoriesRef = baseRef.child(MEMORY_PATH);
const geoRef = baseRef.child(LOCATION_PATH);

const geoFire = new GeoFire(geoRef);

const geoQuery = geoFire.query({
  center: [25, 25],
  radius: 5000
});

const sampleContent = {
  title:'hello',
  data: 'world',
  type: 'text'
};

export function sendMemory(data, loc) {
  // TODO: Validate input before sending, then take out sampleContent
  const newMem = memoriesRef.push({...sampleContent, data});
  geoFire.set(newMem.key(), loc);
  return {
    type: SEND_MEMORY,
    payload: {...sampleContent, data}
  };
}

// export function sendMemory(data, loc) {
//   const newMem = memoriesRef.push( data );
//   geoFire.set(newMem.key(), loc);
// }

export function syncData() {
  // TODO: set up user location handler
  console.log('sync');
  return (dispatch) => {
    geoQuery.on('key_entered', (key, location, distance) => {
      memoriesRef
      .child(key)
      .once('value', (snapshot) => {
        const memory = {...snapshot.val(), key, location, distance};
        dispatch(_receiveMemory(memory));
      });
    });

    geoQuery.on('key_exited', (key) => {
      dispatch(_removeMemory(key));
    });
  };
}

function _receiveMemory(memory) {
  return {
    type: RECEIVE_MEMORY,
    payload: memory
  };
}

function _removeMemory(key) {
  return {
    type: REMOVE_MEMORY,
    payload: key
  };
}

export function checkAuth() {
  // baseRef.unauth();
  return (dispatch) => {
    const authData = baseRef.getAuth();
    if (authData) {
      const displayName = authData[authData.provider].displayName;
      dispatch(_loginSuccess(authData.uid, displayName));
    }
  };
}

export function openLoginModal() {
  return {
    type: LOGIN
  };
}

export function login(provider) {
  return (dispatch) => {
    dispatch(_loggingIn());

    baseRef.authWithOAuthPopup(provider, (error, authData) => {
      if (error) {
        dispatch(_loginFailure(error));
      } else {
        _loginOrSignupUser(authData, dispatch);
      }
    });
  };
}

function _loginOrSignupUser(authData, dispatch) {
  baseRef.child('users').child(authData.uid).once('value', (snapshot) => {
    const displayName = authData[authData.provider].displayName;

    if (!snapshot.exists()) {
      baseRef.child('users').child(authData.uid).set({
        createdAt: Firebase.ServerValue.TIMESTAMP,
        updatedAt: Firebase.ServerValue.TIMESTAMP,
        authProvider: authData.provider,
        displayName: displayName
      });
    } else {
      baseRef.child('users').child(authData.uid).update({
        updatedAt: Firebase.ServerValue.TIMESTAMP
      });
    }
    dispatch(_loginSuccess(authData.uid, displayName));
  });
}

function _loggingIn() {
  return {
    type: LOGIN
  };
}

function _loginSuccess(uid, displayName) {
  return {
    type: LOGIN_SUCCESS,
    payload: { uid, displayName }
  };
}

function _loginFailure(error) {
  console.log(error);
  return {
    type: LOGIN_FAIL,
    payload: {...error }
  };
}
