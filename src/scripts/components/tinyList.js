/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addMessage } from '../actions/actions.js';


class App extends Component {
  render () {
    // from store via connect call (below)
    const { messages } = this.props;
    const previewList = messages.map( (msg) => 
      {return (<div> AT {msg.location} SOMEBODY SAYS {msg.message} </div>);}
    );
    return (
      <div>
        {previewList}
      </div>
    );
  };
};


// App.PropTypes = {
//   messages: PropTypes.arrayOf()
// }

function select(state) {
  return {
    messages: state.messages
  };
};


export default connect(select)(App);

// var React = require('react');

// var Hello = React.createClass({
//   render: function() {
//     return ( <p> Hello World </p> );
//   }
// });

// module.exports = Hello;
