import { RECEIVE_MEMORY, REMOVE_MEMORY, SEND_MEMORY, INITIALIZE_MEMORIES, LOADED_MEMORIES, RATE_MEMORY, UNRATE_MEMORY } from 'constants/ActionTypes.js';
import { memoriesRef, geoFire, reactionsRef, FIREBASE_TIMESTAMP } from 'actions/firebaseVars.js';
import { syncLocation } from 'actions/locationActions.js';

export function initializeMemories(geoQuery) {
  return (dispatch) => {
    const memories = [];

    const onKeyEnterRegistration =
      geoQuery.on('key_entered', (key, location, distance) => {
        memories.push(new Promise((resolve) => {
          memoriesRef
          .child(key)
          .once('value', (snapshot) => {
            resolve({...snapshot.val(), key, location, distance});
          }, (/* err  */) => resolve() );
        }));
      });

    const onReadyRegistration = geoQuery.on('ready', () => {
      onKeyEnterRegistration.cancel();
      onReadyRegistration.cancel();

      Promise.all(memories).then((values) => {
        dispatch(_initializeMemories(values));
        dispatch({type: LOADED_MEMORIES});

        dispatch(syncData(geoQuery));
        dispatch(syncLocation());
      });
    });
  };
}

function _initializeMemories(memories) {
  return {
    type: INITIALIZE_MEMORIES,
    payload: memories
  };
}
export function syncData(geoQuery) {
  let initialized = false;
  return (dispatch) => {
    geoQuery.on('key_entered', (key, location, distance) => {
      if (!initialized) { return; }
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
    geoQuery.on('ready', () => {
      initialized = true;
    });
  };
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

export function sendMemory(content, priv) {
  return (dispatch, getState) => {
  // TODO: Validate input before sending, then take out sampleContent
    const memoryTemplate = {
    // TODO: Convert root state to immutable. Need an npm module to do so
      ownerId: getState().getIn(['auth', 'uid']),
      private: priv || false,
      createdAt: FIREBASE_TIMESTAMP,
      content: {
        title:'hello',
        data: 'world',
        type: 'text'
      }
    };
    memoryTemplate.content = content;
    const newMem = memoriesRef.push(memoryTemplate);
    const location = getState().get('location').toJS();
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

export function rateMemory(key, reaction) {
  return (dispatch, getState) => {
    const userid = getState().getIn(['auth', 'uid']);
    if (!userid) { return; }

    reactionsRef.child(`${key}/${userid}/${reaction}`).set(true, (error) => {
      if (error) {
        console.err(error);
      } else {
        memoriesRef.child(`${key}/reactions/${reaction}`).transaction((currentCount) => {
          const count = currentCount || 0;
          return count + 1;
        }, (err) => {
          if (err) {
            reactionsRef.child(`${key}/${userid}/${reaction}`).set(null);
          } else {
            dispatch(_rateMemory(key, reaction));
          }
        });
      }
    });
  };
}

function _rateMemory(key, reaction) {
  return {
    type: RATE_MEMORY,
    payload: {
      key,
      reaction
    }
  };
}

export function unrateMemory(key, reaction) {
  return (dispatch, getState) => {
    const userid = getState().getIn(['auth', 'uid']);
    if (!userid) { return; }

    reactionsRef.child(`${key}/${userid}/${reaction}`).set(null, (setError) => {
      if (setError) {
        console.err(setError);
      } else {
        memoriesRef.child(`${key}/reactions/${reaction}`).transaction((currentCount) => {
          const count = currentCount || 1;
          return count - 1;
        }, (transactionError) => {
          if (transactionError) {
            reactionsRef.child(`${key}/${userid}/${reaction}`).set(true);
          } else {
            dispatch(_unrateMemory(key, reaction));
          }
        });
      }
    });
  };
}

function _unrateMemory(key, reaction) {
  return {
    type: UNRATE_MEMORY,
    payload: {
      key,
      reaction
    }
  };
}
