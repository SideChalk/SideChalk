import React from 'react';
import MemoryListContainer from 'containers/MemoryListContainer.js';
import ModalExample from 'components/modalExample.js';


class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>SideChalk</h1>
        <ModalExample />
        <MemoryListContainer />
      </div>
    );
  }
}

export default HomeView;
