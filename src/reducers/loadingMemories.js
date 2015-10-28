import { createReducer } from 'utils';
import { LOADED_MEMORIES } from 'constants/ActionTypes.js';

const initialState = true;

export default createReducer(initialState, {
  [LOADED_MEMORIES] : () => false
});
