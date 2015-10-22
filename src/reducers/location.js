import Immutable from 'immutable';
import { createReducer } from 'utils';
import { SET_USER_LOCATION } from '../constants/ActionTypes';

/* eslint new-cap: [1, {"capIsNewExceptions": ["Immutable.List"]}] */
const initialState = Immutable.List();

export default createReducer(initialState, {
  [SET_USER_LOCATION] : (state, location) => state.merge(location)
});
