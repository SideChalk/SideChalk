export const ADD_MESSAGE = 'ADD_MESSAGE';


// "actions" in redux are just objects describing a type and the change desired (in this case a new message to be added)
function addMessage (message, location) {
  return {
    type: ADD_MESSAGE,
    message,
    location
  };
};

export addMessage;  //ES6-style module.exports.addMessage = addMessage