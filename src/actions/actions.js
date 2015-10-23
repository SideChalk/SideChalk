import Firebase from 'firebase';
import GeoFire from 'geofire';

import { FIREBASE_ROOT, MEMORY_PATH, LOCATION_PATH } from 'constants/FirebasePaths.js';
import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY, SET_USER_LOCATION, UPDATE_USER_LOCATION, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN, TOGGLE_LOGIN_MODAL } from 'constants/ActionTypes.js';

const baseRef = new Firebase(FIREBASE_ROOT);
const memoriesRef = baseRef.child(MEMORY_PATH);
const geoRef = baseRef.child(LOCATION_PATH);

const geoFire = new GeoFire(geoRef);

/* Default radius measured in km */
const defaultRadius = 5000;

/* Default center lat/long is currently Moscone Center */
// const defaultCenter = [37.783530, -122.402482];
const defaultCenter = [25, 25];

let geoQuery;

function _setLocation(location) {
  return {
    type: SET_USER_LOCATION,
    payload: location
  };
}

function _updateLocation(location) {
  return {
    type: UPDATE_USER_LOCATION,
    payload: location
  };
}

export function setLocation () {
  return (dispatch) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // set geoQuery center
        dispatch(_setLocation([latitude, longitude]));
        syncData(dispatch, [latitude, longitude]);
      });

      navigator.geolocation.watchPosition((position) => {
        // console.log('Updated coordinates long:' + position.coords.longitude + ' lat:' + position.coords.latitude);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        geoQuery.updateCriteria({
          center: [latitude, longitude],
          radius: defaultRadius
        });
        dispatch(_updateLocation([latitude, longitude]));
      });
    } else {
      // Set location with default
      dispatch(_setLocation(defaultCenter));
      syncData(dispatch, defaultCenter);
    }
  };
}

function syncData(dispatch, center) {
  const query = {
    center,
    radius: defaultRadius
  };
  geoQuery = geoFire.query(query);

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

export function sendMemory(content, loc) {
  return (dispatch, getState) => {
  // TODO: Validate input before sending, then take out sampleContent
    const memoryTemplate = {
    // TODO: Convert root state to immutable. Need an npm module to do so
      ownerId: getState().auth.get('uid'),
      private: false,
      createdAt: Firebase.ServerValue.TIMESTAMP,
      content: {
        title:'hello',
        data: 'world',
        type: 'text',
      }
    };
    memoryTemplate.content = content;
    const newMem = memoriesRef.push(memoryTemplate);
    console.log(loc);
    geoFire.set(newMem.key(), [37, -123]).then( () =>
      dispatch(_sendMemory(memoryTemplate))
    );
  };
}

function _sendMemory(memory) {
  return {
    type: SEND_MEMORY,
    payload: memory
  };
}

export function checkAuth() {
  return (dispatch) => {
    const authData = baseRef.getAuth();
    if (authData) {
      const displayName = authData[authData.provider].displayName;
      dispatch(_loginSuccess(authData.uid, displayName));
    }
  };
}

export function toggleLoginModal() {
  return {
    type: TOGGLE_LOGIN_MODAL
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
