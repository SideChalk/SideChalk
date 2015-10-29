import React from 'react';

import MapContainer from 'containers/MapContainer.js';

class MapView extends React.Component {

  render () {
    return (
      <div className='container'>
      	<MapContainer />
      </div>
    );
  }
}

export default MapView;
