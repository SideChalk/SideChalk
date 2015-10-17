import { ADD_MESSAGE } from './actions/actions.js'  // ES6note: like var ADD_MESSAGE = require('../actions/actions.js').ADD_MESSAGE




function messages(state = [], action) {  // ES6note: default assignment to [] if state is undefined
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state,               // ES6note: '...' spreads an array into individual values (makes adding the next array item without mutating (i.e. push) easy)
      {
        message: action.message,
        location: action.location
      }
      ];
    default:
      return state;
  }
}


export messages;