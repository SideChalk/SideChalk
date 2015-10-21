import React                  from 'react';

import MemoryListContainer from 'containers/MemoryListContainer.js';

export class HomeView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
        <h1>SideChalk</h1>
        <MemoryListContainer />
      </div>
    );
  }
}
