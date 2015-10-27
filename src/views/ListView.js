import React from 'react';
// import { } from 'react-bootstrap';

import MemoryListContainer from 'containers/MemoryListContainer.js';

class ListView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
        <MemoryListContainer />
      </div>
    );
  }
}

export default ListView;
