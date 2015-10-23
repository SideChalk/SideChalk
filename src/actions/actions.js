import Firebase from 'firebase';
import GeoFire from 'geofire';
// import thunk from 'redux-thunk';
import { FIREBASE_ROOT, MEMORY_PATH, LOCATION_PATH } from 'constants/FirebasePaths.js';
import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY, SET_USER_LOCATION, UPDATE_USER_LOCATION } from 'constants/ActionTypes.js';

const baseRef = new Firebase(FIREBASE_ROOT);
const memoriesRef = baseRef.child(MEMORY_PATH);
const geoRef = baseRef.child(LOCATION_PATH);

const geoFire = new GeoFire(geoRef);

/* Default radius measured in km */
const defaultRadius = 5000;

/* Default center lat/long is currently Moscone Center */
// const defaultCenter = [37.783530, -122.402482];
const defaultCenter = [25, 25];

const geoQuery = geoFire.query({
  center: defaultCenter,
  radius: defaultRadius
});

const sampleContent = {
  title:'hello',
  data: 'world',
  type: 'text'
};

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

export function sendMemory(data, loc) {
  // TODO: Validate input before sending, then take out sampleContent
  const newMem = memoriesRef.push({...sampleContent, data});
  geoFire.set(newMem.key(), loc);
  return {
    type: SEND_MEMORY,
    payload: data
  };
}

// function _setUserLocation(location) {
//   return {
//     type: SET_USER_LOCATION,
//     payload: location
//   };
// }

export function setLocation () {
  return (dispatch) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // set geoQuery center
        dispatch(_setLocation([latitude, longitude]));
        syncData(dispatch);
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
      syncData(dispatch);
    }
  };
}

function syncData(dispatch) {
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
// export function syncData() {
//   // TODO: set up user location handler
//   console.log('syncing');
//   return (dispatch) => {
//     geoQuery.on('key_entered', (key, location, distance) => {
//       memoriesRef
//       .child(key)
//       .once('value', (snapshot) => {
//         const memory = {...snapshot.val(), key, location, distance};
//         dispatch(_receiveMemory(memory));
//       });
//     });

//     geoQuery.on('key_exited', (key) => {
//       dispatch(_removeMemory(key));
//     });
//   };
// }
