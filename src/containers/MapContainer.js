import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Map from 'components/Map.js';
import { showMemoryDetails } from 'actions/memoryModalActions.js';

export class MapContainer extends React.Component {

  static propTypes = {
    memories: React.PropTypes.object,
    showMemoryDetails: React.PropTypes.func,
    location: React.PropTypes.object
  }

  render() {
    const {memories, location} = this.props;

    return (
      <Map memories={memories.toJS()}
           location={location.toJS()}
           showMemoryDetails={this.props.showMemoryDetails}/>
    );
  }
}

const mapStateToProps = (state) => ({
  memories : state.get('memories'),
  location: state.get('location')
});
const mapDispatchToProps = (dispatch) => ({
  showMemoryDetails : bindActionCreators(showMemoryDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
