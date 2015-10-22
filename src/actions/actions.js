import Firebase from 'firebase';
import GeoFire from 'geofire';
// import thunk from 'redux-thunk';
import { FIREBASE_ROOT, MEMORY_PATH, LOCATION_PATH } from 'constants/FirebasePaths.js';
import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY } from 'constants/ActionTypes.js';

const baseRef = new Firebase(FIREBASE_ROOT);
const memoriesRef = baseRef.child(MEMORY_PATH);
const geoRef = baseRef.child(LOCATION_PATH);

const geoFire = new GeoFire(geoRef);

const defaultRadius = 5000;
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

// function setLocation () {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       console.log('Coordinates long:' + position.coords.longitude + ' lat:' + position.coords.latitude);
//       updateLocationListener();
//     });
//   }
// }

export function updateLocationListener () {
  return (dispatch) => {
    navigator.geolocation.watchPosition((position) => {
      console.log('Updated coordinates long:' + position.coords.longitude + ' lat:' + position.coords.latitude);
      geoQuery.updateCriteria({
        center: [position.coords.latitude, position.coords.longitude],
        radius: defaultRadius
      });
    });
  };
}

export function syncData() {
  // TODO: set up user location handler
  // if (navigator.geolocation) {
  //   // navigator.geolocation.getCurrentPosition((position) => {
  //   //   console.log('Coordinates long:' + position.coords.longitude + ' lat:' + position.coords.latitude);
  //   // });
  //   navigator.geolocation.watchPosition((position) => {
  //     console.log('Updated coordinates long:' + position.coords.longitude + ' lat:' + position.coords.latitude);
  //     geoQuery.updateCriteria({
  //       center: [position.coords.latitude, position.coords.longitude]
  //     });
  //   });
  // }
  console.log('syncing');
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
