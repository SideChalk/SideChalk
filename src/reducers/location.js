import { createReducer } from 'utils';
import { SET_USER_LOCATION } from '../constants/ActionTypes';

const initialState = [];
export default createReducer(initialState, {
  [SET_USER_LOCATION] : (state, location) => location
});
