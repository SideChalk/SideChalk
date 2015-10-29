import React, { Component, PropTypes } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import * as moment from 'moment';

export default class MemoryModal extends Component {

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
    const key = payload.key;
    const reactionType = payload.reactionType;
    // This should probably be an action to manipulate DB & increment number
    console.log(key, reactionType);
    // Need to update display number
      // Probably also want to toggle as well
  }

  fetchReactions (input, memoryObj) {
    // Here we could perhaps query Firebase DB?
    if (!input) return;
 
    const output = [];
    for (const reaction in input) {
      if (reaction === 'smile') {
        output.push(
          <i className="fa fa-smile-o pull-right fa-border fa-2x"
            onClick={() =>
              this.reactionHandler({
                key:memoryObj.key,
                reactionType: reaction,
                context:this})}>
                { input[reaction] }
            </i>);
      }else if (reaction === 'frown') {
        output.push(
          <i className="fa fa-frown-o pull-right fa-border fa-2x"
            onClick={() =>
              this.reactionHandler({
                key:memoryObj.key,
                reactionType: reaction,
                context:this})}>
                { input[reaction] }
            </i>);
      }else if( reaction === 'heart') {
        output.push(
          <i className="fa fa-heart-o pull-right fa-border fa-2x"
            onClick={() =>
              this.reactionHandler({
                key:memoryObj.key,
                reactionType: reaction,
                context:this})}>
                { input[reaction]}
            </i>);
      }
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
            <Modal.Title>{memory.content.title}

            {memory.key}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body">{memoryBody}</Modal.Body>
          <Modal.Footer className="memory-modal-footer">
           <div className="text-left">
            <div>
              { this.cleanDate(memory.createdAt) } ({ this.cleanDistance(memory.distance) })
            </div>
            <div>Reactions:</div>
              <div>

                { this.cleanDate(memory.createdAt) } ({ this.cleanDistance(memory.distance) })
              </div>
               <div>
               { this.fetchReactions(memory.reactions, memory) }
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
