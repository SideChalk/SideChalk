import React from 'react';
// import { } from 'react-bootstrap';

import MemoryListContainer from 'containers/MemoryListContainer.js';
import CreateMemoryContainer from 'containers/CreateMemoryContainer.js';

export class ListView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
        <CreateMemoryContainer />
        <MemoryListContainer />
      </div>
    );
  }
}

export default ListView;
