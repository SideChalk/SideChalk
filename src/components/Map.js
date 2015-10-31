import {default as React, Component} from 'react';
import {GoogleMap, Marker} from 'react-google-maps';

import { mapStyles } from '../styles/mapStyles';
import { defaultRadius } from '../actions/firebaseVars';

const VISIBILITY_LIMIT = defaultRadius;

export default class Map extends Component {

  static propTypes = {
    memories: React.PropTypes.array,
    showMemoryDetails: React.PropTypes.func,
    location: React.PropTypes.array,
    memoryInFocus: React.PropTypes.object
  }

  componentDidMount() {
    // listen for window resizing and force rerender (to recenter map)
    window.addEventListener('resize', () => this.updateDimensions() );
  }

  componentWillUpdate() {
    // listen for when a memory detail modal is closed
    // and initiate stop-countdown for that memory icon's bouncing animation
    if (this.props.memoryInFocus) {
      const previousMemoryInFocus = this.props.memoryInFocus.toJS();
      const previousMemoryMarker = this.refs[previousMemoryInFocus.key].state.marker;
      setTimeout(() => { previousMemoryMarker.setAnimation(null); }, 3000);
    }
  }

  updateDimensions() {
    this.render();
  }

  handleMarkerClick(memory) {
    // start bouncing new focus memory, then show detail modal as with list
    this.refs[memory.key].state.marker.setAnimation(google.maps.Animation.BOUNCE);
    this.props.showMemoryDetails(memory);
  }

  renderMemoryMarker(memory) {
    let icon = {
      path: null,
      scale: 0.5,
      strokeWeight: 1.5,
      strokeColor: '#cecece',
      strokeOpacity: 1 - (memory.distance / VISIBILITY_LIMIT),
      fillColor: '#b4b4b4',
      fillOpacity: 1 - (memory.distance / VISIBILITY_LIMIT)
    };
    if (memory.private) {
      icon.fillColor = '#FC6D24';    // special color to indicate private memories
    }
    // set Icon Paths manually using Font-Awesome path values
    if (memory.content.type === 'text') {
      icon.path = 'M64.512 -32.183q0 6.264 -4.32 11.574t-11.736 8.388 -16.2 3.078q-2.52 0 -5.22 -0.288 -7.128 6.3 -16.56 8.712 -1.764 0.504 -4.104 0.792 -0.612 0.072 -1.098 -0.324t-0.63 -1.044v-0.036q-0.108 -0.144 -0.018 -0.432t0.072 -0.36 0.162 -0.342l0.216 -0.324 0.252 -0.306 0.288 -0.324q0.252 -0.288 1.116 -1.242t1.242 -1.368 1.116 -1.422 1.17 -1.836 0.972 -2.124 0.936 -2.736q-5.652 -3.204 -8.91 -7.92t-3.258 -10.116q0 -4.68 2.556 -8.946t6.876 -7.362 10.296 -4.914 12.528 -1.818q8.784 0 16.2 3.078t11.736 8.388 4.32 11.574z';
    } else if (memory.content.type === 'music') {
      icon.path = 'M55.296 -56.375v40.32q0 1.8 -1.224 3.204t-3.096 2.178 -3.726 1.152 -3.474 0.378 -3.474 -0.378 -3.726 -1.152 -3.096 -2.178 -1.224 -3.204 1.224 -3.204 3.096 -2.178 3.726 -1.152 3.474 -0.378q3.78 0 6.912 1.404v-19.332l-27.648 8.532v25.524q0 1.8 -1.224 3.204t-3.096 2.178 -3.726 1.152 -3.474 0.378 -3.474 -0.378 -3.726 -1.152 -3.096 -2.178 -1.224 -3.204 1.224 -3.204 3.096 -2.178 3.726 -1.152 3.474 -0.378q3.78 0 6.912 1.404v-34.812q0 -1.116 0.684 -2.034t1.764 -1.278l29.952 -9.216q0.432 -0.144 1.008 -0.144 1.44 0 2.448 1.008t1.008 2.448z';
    } else if (memory.content.type === 'drawing') {
      icon.path = 'M58.14 -64.439q2.52 0 4.41 1.674t1.89 4.194q0 2.268 -1.62 5.436 -11.952 22.644 -16.74 27.072 -3.492 3.276 -7.848 3.276 -4.536 0 -7.794 -3.33t-3.258 -7.902q0 -4.608 3.312 -7.632l22.968 -20.844q2.124 -1.944 4.68 -1.944zm-32.724 37.224q1.404 2.736 3.834 4.68t5.418 2.736l0.036 2.556q0.144 7.668 -4.662 12.492t-12.546 4.824q-4.428 0 -7.848 -1.674t-5.49 -4.59 -3.114 -6.588 -1.044 -7.92q0.252 0.18 1.476 1.08t2.232 1.602 2.124 1.314 1.656 0.612q1.476 0 1.98 -1.332 0.9 -2.376 2.07 -4.05t2.502 -2.736 3.168 -1.71 3.708 -0.918 4.5 -0.378';
      // icon = '../styles/chalk-icon.png';
    }


    const marker = {
      position: {
        lat: memory.location[0],
        lng: memory.location[1]
      },
      key: memory.key,
      defaultAnimation: 2,
      icon: icon
    };
    return (
      <Marker
        className='markers'
        {...marker}
        onClick={() => this.handleMarkerClick(memory)}
        ref={memory.key} />
    );
  }

  render() {
    if (this.refs.map) {                    // force map center to update (triggered on window resize)
      this.refs.map.state.map.setCenter({
        lat: this.props.location[0],
        lng: this.props.location[1]
      });
    }

    return (
      // TODO: Fix sizing. Currently setting the map size using abosolute pixel values
      // This won't look correct on a mobile device
      <div className='map-wrap'>
        <div className='map' style={{height: '85vh', width: '85vw'}}>
          <GoogleMap ref='map'
            containerProps={{
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
              draggable: false,
              zoomControl: false,
              disableDoubleClickZoom: true,
              scrollwheel: false,
              styles: mapStyles               // mapStyles imported from separate file
            }}
          >
            {this.props.memories.map((memory) => {return this.renderMemoryMarker(memory);} )}
          </GoogleMap>
        </div>
        <div className='map-mask' style={{height: '85%', width: '85%'}}></div>
      </div>
    );
  }

}
