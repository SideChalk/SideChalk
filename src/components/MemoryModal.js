import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as moment from 'moment';

export default class MemoryModal extends Component {

  cleanDate (input) {
    const rootDate = moment.default(input).fromNow();
    return rootDate;
  }

  cleanDistance (input){
    var units = "km";
    var distanceString = input.toFixed(2) + " " + units + " away";
    return distanceString;
  }

  render () {
    const { memoryModalState, memoryModalActions } = this.props;
    const memory = memoryModalState.memoryInFocus;
    const dismissMemoryDetails = memoryModalActions.dismissMemoryDetails;

    return (
      <Modal show={memoryModalState.showMemoryModal}
             onHide={dismissMemoryDetails}
             style={{opacity: 1 - (memory.distance / 3000)}}>
        <div className="memory-modal">
          <Modal.Header className="memory-modal-title">
            <Modal.Title>{memory.content.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body">{memory.content.data}</Modal.Body>
          <Modal.Footer className="memory-modal-footer">
           <div className="text-left">
            <div>
              { this.cleanDate(memory.createdAt) } ({ this.cleanDistance(memory.distance) })
            </div>
            <div>Reactions:</div>
              <div>
                <i className="fa fa-smile-o fa-2x fa-border">2</i>
                <i className="fa fa-frown-o fa-2x fa-border">3</i>
                <i className="fa fa-heart fa-2x fa-border"></i>
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

