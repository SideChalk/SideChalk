import {default as React, Component} from 'react';

import {GoogleMap, Marker} from 'react-google-maps';

export default class Map extends Component {

  static propTypes = {
    memories: React.PropTypes.array,
    showMemoryDetails: React.PropTypes.func,
    location: React.PropTypes.array
  }

  render() {
    return (
      // TODO: Fix sizing. Currently setting the map size using abosolute pixel values
      // This won't look correct on a mobile device
      <section style={{height: '1000px', width: '1000px'}}>
        <GoogleMap containerProps={{
          style: {
            height: '100%'
          }
        }}
        defaultZoom={16}
        defaultCenter={{
          lat: this.props.location[0],
          lng: this.props.location[1]
        }}
        defaultOptions={{
          draggable:false,
          zoomControl:false,
          scrollwheel:false
        }}
        >
        {this.props.memories.map((memory) => {
          const marker = {
            position: {
              lat: memory.location[0],
              lng: memory.location[1]
            },
            key: memory.key,
            defaultAnimation: 2
          };
          return (
            <Marker
              {...marker}
              onClick={() => this.props.showMemoryDetails(memory)} />
          );
        })}
        </GoogleMap>
      </section>
    );
  }
}
