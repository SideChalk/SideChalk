import Immutable from 'immutable';
import { createReducer } from 'utils';
import { SET_USER_LOCATION, UPDATE_USER_LOCATION } from '../constants/ActionTypes';

const initialState = Immutable.List();
export default createReducer(initialState, {
  [SET_USER_LOCATION] : setLocation,
  [UPDATE_USER_LOCATION] : updateLocation
});

function setLocation (location, startLocation) {
  return Immutable.fromJS(startLocation);
}

function updateLocation (location, newLocation) {
  return Immutable.fromJS(newLocation);
}
