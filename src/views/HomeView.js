import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import MemoryListContainer from 'containers/MemoryListContainer.js';
import LoginModal from 'components/loginModal.js';

class HomeView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
        <LoginModal />
        <Jumbotron className="title">
          <h1>SideChalk</h1>
        </Jumbotron>
        <MemoryListContainer />
      </div>
    );
  }
}

export default HomeView;
