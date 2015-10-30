import React, { Component, PropTypes } from 'react';
import { Modal, Button, Image }        from 'react-bootstrap';
import * as moment                     from 'moment';
import {reactionTypes}                 from '../actions/firebaseVars.js';
import { connect }                     from 'react-redux';
import { rateMemory, unrateMemory}     from '../actions/memoryActions.js';
import { bindActionCreators }          from 'redux';


export class MemoryModal extends Component {
  static propTypes = {
    userUID: React.PropTypes.string,
    rateMemory: React.PropTypes.func,
    unrateMemory: React.PropTypes.func
  };

  cleanDate (input) {
    const rootDate = moment.default(input).fromNow();
    return rootDate;
  }

  cleanDistance (input) {
    const units = 'km';
    const distanceString = input.toFixed(2) + ' ' + units + ' away';
    return distanceString;
  }

  reactionHandler (payload) {
    if (this.props.userUID === null) {
      // User not logged in
      return;
    }
    const key = payload.key;
    const reactionType = payload.reactionType;
    
    // This should probably be an action to manipulate DB & increment number

    // If user has not voted before
    /*
      if (USER_HAS_NOT_VOTED){
        this.props.rateMemory(key, reactionType);
      } else {
        this.props.unrateMemory(key, reactionType);
      }

    */

    this.props.rateMemory(key, reactionType);
    // Get access to count and increment it
      // Then "draw" it on the page somehow
      // We have access to a unique key

    // If user has voted before
    // this.props.unrateMemory(key, reactionType);
    // Get access to count and increment it
      // Then "draw" it on the page somehow
      // Somehow change the class
  }

  fetchReactions (memoryObj) {
    const reactions = memoryObj.reactions;
    const output = [];
    for (let i = 0; i < reactionTypes.length; i++) {
      const classRef = reactionTypes[i];
      output.push(
         <i key={i} className={`fa fa-${classRef}-o fa-border fa-2x`}
           onClick={() =>
             this.reactionHandler({
               key:memoryObj.key,
               reactionType: classRef,
               context:this})}>
               {reactions ? reactions[classRef] ? reactions[classRef] : 0 : 0}
           </i>);
    }
    return output;
  }


  render () {
    const { memoryModalState, memoryModalActions } = this.props;
    const memory = memoryModalState.memoryInFocus;
    const dismissMemoryDetails = memoryModalActions.dismissMemoryDetails;

    let memoryBody = null;
    if (memory.content.type === 'text') {
      memoryBody = memory.content.data;
    } else if (memory.content.type === 'music') {
      const musicData = memory.content.data;
      memoryBody = (<div>
        <Image
          src={musicData.artworkUrl100} rounded
          style={{marginRight: 5}}/>
        <h2>{musicData.trackName}</h2>
        <h4>{musicData.artistName}</h4>
        <audio src={memory.content.data.previewUrl} autoPlay controls />
      </div>);
    }

    return (
      <Modal show={memoryModalState.showMemoryModal}
             onHide={dismissMemoryDetails}
             style={{opacity: 1 - (memory.distance / 3000)}}>
        <div className="memory-modal">
          <Modal.Header className="memory-modal-title">
            <Modal.Title>{memory.content.title} {memory.key}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body">{memoryBody}</Modal.Body>
          <Modal.Footer className="memory-modal-footer">
           <div className="text-left">
            <div>
              { this.cleanDate(memory.createdAt) } ({ this.cleanDistance(memory.distance) })
            </div>
            <div>Reactions:</div>
               <div>
               { this.fetchReactions(memory) }
              </div>
           </div>
            <Button onClick={dismissMemoryDetails}>Close</Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }

}

MemoryModal.propTypes = {
  memoryModalState: PropTypes.shape({
    memoryInFocus: PropTypes.object,
    showMemoryModal: PropTypes.boolean
  }),
  memoryModalActions: PropTypes.shape({
    showMemoryDetails: PropTypes.func,
    dismissMemoryDetails: PropTypes.func
  })
};

const mapDispatchToProps = (dispatch) => ({
  rateMemory: bindActionCreators(rateMemory, dispatch),
  unrateMemory: bindActionCreators(unrateMemory, dispatch)
});


const mapStateToProps = (state) => ({
  userUID: state.getIn(['auth', 'uid'])
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryModal);

