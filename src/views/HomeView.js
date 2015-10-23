import React from 'react';

import MemoryListContainer from 'containers/MemoryListContainer.js';
import LoginModal from 'components/loginModal.js';

class HomeView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
         <LoginModal />
          <h1>SideChalk</h1>
        <MemoryListContainer />
      </div>
    );
  }
}

export default HomeView;
