import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY } from 'constants/ActionTypes.js';
import { memoriesRef, geoFire, FIREBASE_TIMESTAMP } from 'actions/firebaseVars.js';

export function syncData(dispatch, geoQuery) {
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

export function sendMemory(content) {
  return (dispatch, getState) => {
  // TODO: Validate input before sending, then take out sampleContent
    const memoryTemplate = {
    // TODO: Convert root state to immutable. Need an npm module to do so
      ownerId: getState().auth.get('uid'),
      private: false,
      createdAt: FIREBASE_TIMESTAMP,
      content: {
        title:'hello',
        data: 'world',
        type: 'text'
      }
    };
    memoryTemplate.content = content;
    const newMem = memoriesRef.push(memoryTemplate);
    const location = getState().location.toJS();
    geoFire.set(newMem.key(), location).then( () =>
      dispatch(_sendMemory(memoryTemplate))
    );
  };
}

function _sendMemory(memory) {
  return {
    type: SEND_MEMORY,
    payload: memory
  };
}
