import { createStore } from 'redux';  //ES6-style createStore = require('redux').createStore

import messages from './reducers/reducers.js';
import { addMessage } from './actions/actions.js'


let store = createStore(messages);      //ES6-style var declaration

console.log("INITIAL STATE:", store.getState());

let unsubscribe = store.subscribe(     //redux "subscribe" is a listener for changes, takes a callback, returns a function to cancel the same listener (hence "unsubscribe")
  () => console.log(store.getState())  //ES6-style anonymous function for callback (just log the whole state on change)
);


// redux: store.dispatch is the only way to trigger state changes. takes an action as arg
store.dispatch(addMessage('testing 123...', [45,65]));
store.dispatch(addMessage('testing 456...', [10,15]));


//stop listening/logging
unsubscribe();