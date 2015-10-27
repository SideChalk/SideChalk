import { createReducer } from 'utils';
import { LOCATION_ERROR } from 'constants/ActionTypes.js';

const initialState = null;

export default createReducer(initialState, {
  [LOCATION_ERROR] : (state, error) => error
});
