import immutable, {fromJS} from 'immutable';

import memoriesReducer from 'reducers/memories.js';

import {
  RECEIVE_MEMORY,
  REMOVE_MEMORY,
  SEND_MEMORY
} from 'constants/ActionTypes.js';

describe('memories reducer', () => {
  const initialState = immutable.List();

  it('should return the initial state', () => {
    const state = memoriesReducer(undefined, {});
    assert( immutable.is(state, initialState) );
  });

  it('should receive memory and sort by distance', () => {
    const memory1 = {
      ownerId: 'owner123',
      private: false,
      createdAt: 123,
      content: {
        title:'hello',
        data: 'world',
        type: 'text'
      },
      key: 'KEY123',
      location: [0,0],
      distance: 100
    };
    const memory2 = Object.assign({}, memory1, {distance:10});
    const state1 = memoriesReducer(initialState, {
        type: RECEIVE_MEMORY,
        payload: memory1
    });

    expect( state1.toJS() ).to.eql([memory1]);

    const state2 = memoriesReducer(state1, {
        type: RECEIVE_MEMORY,
        payload: memory2
    });

    expect( state2.toJS() ).to.eql([memory2, memory1]);
  });

  it('should remove memory', () => {
    const memory1 = {
      ownerId: 'owner123',
      private: false,
      createdAt: 123,
      content: {
        title:'hello',
        data: 'world',
        type: 'text'
      },
      key: 'KEY123',
      location: 'SF',
      distance: 100
    };
    const memory2 = {
      ownerId: 'owner2',
      private: false,
      createdAt: 123,
      content: {
        title:'hello',
        data: 'world',
        type: 'text'
      },
      key: 'removeMe',
      location: 'SF',
      distance: 100
    };
    const startingState = fromJS([memory2, memory1]);

    const state = memoriesReducer(startingState, {
      type: REMOVE_MEMORY,
      payload: 'removeMe'
    });

    expect( state.toJS() ).to.eql([memory1]);
  });
});
