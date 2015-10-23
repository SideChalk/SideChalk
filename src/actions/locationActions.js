import { SET_USER_LOCATION, UPDATE_USER_LOCATION } from 'constants/ActionTypes.js';
import { geoFire, defaultCenter, defaultRadius } from 'actions/firebaseVars.js';
import { syncData } from 'actions/memoryActions.js';

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

        dispatch(_setLocation([latitude, longitude]));

        geoQuery = geoFire.query({
          center: [latitude, longitude],
          radius: defaultRadius
        });
        syncData(dispatch, geoQuery);
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

      geoQuery = geoFire.query({
        center: defaultCenter,
        radius: defaultRadius
      });
      syncData(dispatch, geoQuery);
    }
  };
}
