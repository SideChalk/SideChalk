// var React = require('react');

// var App = require('./components/tinyList');

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';  //ES6-style createStore = require('redux').createStore
import { Provider } from 'react-redux';


import App from './components/tinyList.js';
import { messages } from './reducers/reducers.js';
import { addMessage } from './actions/actions.js'

console.log("messsages:", messages);
console.log("addMessage:", addMessage);

let store = createStore(messages);      //ES6-style var declaration

console.log("INITIAL STATE:", store.getState());

let unsubscribe = store.subscribe(     //redux "subscribe" is a listener for changes, takes a callback, returns a function to cancel the same listener (hence "unsubscribe")
  () => console.log(store.getState())  //ES6-style anonymous function for callback (just log the whole state on change)
);



let rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);


// redux: store.dispatch is the only way to trigger state changes. takes an action as arg
store.dispatch(addMessage('testing 123...', [45,65]));
store.dispatch(addMessage('testing 456...', [10,15]));
store.dispatch(addMessage('boo yeah!', [1,2]));
store.dispatch(addMessage('now we are cooking.', [4,88]));
store.dispatch(addMessage('Sup guys.', [50,50]));


//stop listening/logging
unsubscribe();