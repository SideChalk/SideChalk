import { SET_USER_LOCATION, UPDATE_USER_LOCATION, LOCATION_ERROR } from 'constants/ActionTypes.js';
import { geoFire, defaultCenter, defaultRadius } from 'actions/firebaseVars.js';
import { initializeMemories } from 'actions/memoryActions.js';
import GeoFire from 'geofire';

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
        dispatch( initializeMemories(geoQuery) );
      }, (error) => {
        const PERMISSION_DENIED = 1;
        if (error.code === PERMISSION_DENIED) {
          dispatch({
            type: LOCATION_ERROR,
            payload: 'SideChalk does not have permission to use your location'
          });
        } else {
          dispatch({
            type: LOCATION_ERROR,
            payload: 'SideChalk was unable to find your location'
          });
        }
        dispatch(_setLocation(defaultCenter));
        geoQuery = geoFire.query({
          center: defaultCenter,
          radius: defaultRadius
        });
        dispatch( initializeMemories(geoQuery) );
      });
    } else {
      // Set location with default
      dispatch({
        type: LOCATION_ERROR,
        payload: 'Your browser does not support geolocation'
      });
      dispatch(_setLocation(defaultCenter));

      geoQuery = geoFire.query({
        center: defaultCenter,
        radius: defaultRadius
      });
      dispatch( initializeMemories(geoQuery) );
    }
  };
}

export function syncLocation () {
  return (dispatch, getState) => {
    const state = getState();
    const oldLocation = state.get('location');
    // alert(GeoFire.distance(oldLocation.toArray(), oldLocation.toArray()));
    navigator.geolocation.watchPosition((position) => {
      // console.log('Updated coordinates long:' + position.coords.longitude + ' lat:' + position.coords.latitude);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const newPosition = [latitude, longitude];
      if (GeoFire.distance(oldLocation.toArray(), newPosition) > 0.25) {
        geoQuery.updateCriteria({
          center: newPosition,
          radius: defaultRadius
        });
        dispatch(_updateLocation(newPosition));
      }
    });
  };
}
