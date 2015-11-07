import {default as React, Component} from 'react';
import {GoogleMap, Marker} from 'react-google-maps';
import $ from 'jquery';

import { mapStyles } from '../styles/mapStyles';
import { defaultRadius } from '../actions/firebaseVars';
import { getColorFromReactions, getOpacity } from '../utils/colorUtils';

const VISIBILITY_LIMIT = defaultRadius;
// const TIME_LIMIT_DAYS = 20;
// const TIME_LIMIT = TIME_LIMIT_DAYS * 24 * 60 * 60 * 1000;
const WIGGLE_ROOM = 2.8;
const MEMORY_COLOR = '#FC6D24';

export default class Map extends Component {

  static propTypes = {
    memories: React.PropTypes.array,
    showMemoryDetails: React.PropTypes.func,
    location: React.PropTypes.array,
    memoryInFocus: React.PropTypes.object
  }

  componentWillMount() {
    this.center = new google.maps.LatLng(this.props.location[0], this.props.location[1]);
    this.neBound = google.maps.geometry.spherical.computeOffset(this.center, 1000 * VISIBILITY_LIMIT * WIGGLE_ROOM, 45);
    this.swBound = google.maps.geometry.spherical.computeOffset(this.center, 1000 * VISIBILITY_LIMIT * WIGGLE_ROOM, 235);
    this.bounds = new google.maps.LatLngBounds(this.swBound, this.neBound);
  }

  componentDidMount() {
    // listen for window resizing and force rerender (to recenter map)
    window.addEventListener('resize', () => this.recenter() );
    // set listener to catch if user pans outside allowed bounds and force them to recenter
    window.setTimeout(() => {  // let async initializing of google map (from render) finish before accessing
      const gmap = this.refs.map.state.map;
      window.google.maps.event.addListener(gmap, 'dragend', () => {
        const newBounds = gmap.getBounds();
        if (!this.bounds.contains(newBounds.getNorthEast()) || !this.bounds.contains(newBounds.getSouthWest())) {
          this.recenter();
        }
      });
    }, 100);
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

  // some math magic from stackoverflow
  // to calculate initial google maps zoom level to certain boundaries
  getBoundsZoomLevel(bounds, mapDim) {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    function latRad(lat) {
      const sin = Math.sin(lat * Math.PI / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }

  recenter() {
    // otherwise, recenter map and force set map boundaries (e.g. if rerendering b/c of resize)
    const gmap = this.refs.map.state.map;
    // force map center to update (triggered on window resize)
    gmap.panTo(this.center);
    // set/lock map bounds based on visibility limit
    gmap.fitBounds(new google.maps.LatLngBounds(this.swBound, this.neBound));
    this.render();
  }

  handleMarkerClick(memory) {
    // start bouncing new focus memory, then show detail modal as with list
    this.refs[memory.key].state.marker.setAnimation(google.maps.Animation.BOUNCE);
    this.props.showMemoryDetails(memory);
  }

  renderMemoryMarker(memory) {
    const signalStrength = getOpacity(memory);
    if (signalStrength === 0) {
      return null;
    }

    const icon = {
      path: null,
      scale: 0.5,
      strokeWeight: 1.5,
      strokeColor: '#cecece',
      strokeOpacity: signalStrength,
      fillColor: '#b4b4b4',
      fillOpacity: signalStrength
    };
    if (memory.private) {
      icon.fillColor = MEMORY_COLOR;    // special color to indicate private memories
    }

    // style experiment: set stroke to dynamic color based on reactions
    const rgbString = memory.reactions ? getColorFromReactions(memory.reactions) : 'white';
    icon.strokeColor = rgbString;

    // set Icon Paths manually using Font-Awesome path values
    if (memory.content.type === 'text') {
      icon.path = 'M64.512 -32.183q0 6.264 -4.32 11.574t-11.736 8.388 -16.2 3.078q-2.52 0 -5.22 -0.288 -7.128 6.3 -16.56 8.712 -1.764 0.504 -4.104 0.792 -0.612 0.072 -1.098 -0.324t-0.63 -1.044v-0.036q-0.108 -0.144 -0.018 -0.432t0.072 -0.36 0.162 -0.342l0.216 -0.324 0.252 -0.306 0.288 -0.324q0.252 -0.288 1.116 -1.242t1.242 -1.368 1.116 -1.422 1.17 -1.836 0.972 -2.124 0.936 -2.736q-5.652 -3.204 -8.91 -7.92t-3.258 -10.116q0 -4.68 2.556 -8.946t6.876 -7.362 10.296 -4.914 12.528 -1.818q8.784 0 16.2 3.078t11.736 8.388 4.32 11.574z';
    } else if (memory.content.type === 'music') {
      icon.path = 'M55.296 -56.375v40.32q0 1.8 -1.224 3.204t-3.096 2.178 -3.726 1.152 -3.474 0.378 -3.474 -0.378 -3.726 -1.152 -3.096 -2.178 -1.224 -3.204 1.224 -3.204 3.096 -2.178 3.726 -1.152 3.474 -0.378q3.78 0 6.912 1.404v-19.332l-27.648 8.532v25.524q0 1.8 -1.224 3.204t-3.096 2.178 -3.726 1.152 -3.474 0.378 -3.474 -0.378 -3.726 -1.152 -3.096 -2.178 -1.224 -3.204 1.224 -3.204 3.096 -2.178 3.726 -1.152 3.474 -0.378q3.78 0 6.912 1.404v-34.812q0 -1.116 0.684 -2.034t1.764 -1.278l29.952 -9.216q0.432 -0.144 1.008 -0.144 1.44 0 2.448 1.008t1.008 2.448z';
    } else if (memory.content.type === 'drawing') {
      icon.path = 'M42.84 -43.523l10.548 -10.548 -3.852 -3.852 -10.548 10.548zm16.092 -10.548q0 0.972 -0.648 1.62l-46.296 46.296q-0.648 0.648 -1.62 0.648t-1.62 -0.648l-7.128 -7.128q-0.648 -0.648 -0.648 -1.62t0.648 -1.62l46.296 -46.296q0.648 -0.648 1.62 -0.648t1.62 0.648l7.128 7.128q0.648 0.648 0.648 1.62zm-48.636 -6.84l3.528 1.08 -3.528 1.08 -1.08 3.528 -1.08 -3.528 -3.528 -1.08 3.528 -1.08 1.08 -3.528zm12.6 5.832l7.056 2.16 -7.056 2.16 -2.16 7.056 -2.16 -7.056 -7.056 -2.16 7.056 -2.16 2.16 -7.056zm33.48 17.208l3.528 1.08 -3.528 1.08 -1.08 3.528 -1.08 -3.528 -3.528 -1.08 3.528 -1.08 1.08 -3.528zm-23.04 -23.04l3.528 1.08 -3.528 1.08 -1.08 3.528 -1.08 -3.528 -3.528 -1.08 3.528 -1.08 1.08 -3.528';
      // icon.path = 'M58.14 -64.439q2.52 0 4.41 1.674t1.89 4.194q0 2.268 -1.62 5.436 -11.952 22.644 -16.74 27.072 -3.492 3.276 -7.848 3.276 -4.536 0 -7.794 -3.33t-3.258 -7.902q0 -4.608 3.312 -7.632l22.968 -20.844q2.124 -1.944 4.68 -1.944zm-32.724 37.224q1.404 2.736 3.834 4.68t5.418 2.736l0.036 2.556q0.144 7.668 -4.662 12.492t-12.546 4.824q-4.428 0 -7.848 -1.674t-5.49 -4.59 -3.114 -6.588 -1.044 -7.92q0.252 0.18 1.476 1.08t2.232 1.602 2.124 1.314 1.656 0.612q1.476 0 1.98 -1.332 0.9 -2.376 2.07 -4.05t2.502 -2.736 3.168 -1.71 3.708 -0.918 4.5 -0.378';
      // icon = '../assets/chalk-icon.png';
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
    let zoomLevel = 16;

    if (!this.refs.map) {
      // on first render, set zoom level based on visibility limit
      const mapDimensions = {
        height: $('.view-container').height(),
        width: $('.view-container').width()
      };
      zoomLevel = this.getBoundsZoomLevel(this.bounds, mapDimensions);
    }

    return (
      <div className='map-wrap' style={{position: 'relative', width: '85%', margin: '0px auto'}}>
        <div className='map' style={{
          height: '85vh',
          width: '85vw'
        }}>
          <GoogleMap ref='map'
            containerProps={{
              style: { height: '100%' }
            }}
            defaultZoom={zoomLevel}
            defaultCenter={this.center}
            defaultOptions={{
              // draggable: false,
              // zoomControl: false,
              // disableDoubleClickZoom: true,
              // scrollwheel: false,
              minZoom: zoomLevel,
              styles: mapStyles      // mapStyles imported from separate file
            }}
          >
            {this.props.memories.map((memory) => {return this.renderMemoryMarker(memory);} )}
          </GoogleMap>
        </div>
        <div className='map-mask'
          style={{
            height: '85vh',
            width: '85vw',
            top: '0px'
          }}></div>
      </div>
    );
  }

}
