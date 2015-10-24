import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class MemoryModal extends Component {

  render() {
    const { memoryModalState, memoryModalActions } = this.props;
    const memory = memoryModalState.memoryInFocus;
    const dismissMemoryDetails = memoryModalActions.dismissMemoryDetails;

    return (
      <Modal show={memoryModalState.showMemoryModal}
             onHide={dismissMemoryDetails}
             style={{opacity: 1 - (memory.distance / 3000)}}>
        <div className="memory-modal">
          <Modal.Header closeButton className="memory-modal-title">
            <Modal.Title>{memory.content.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body">{memory.content.data}</Modal.Body>
          <Modal.Footer className="memory-modal-footer">
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
