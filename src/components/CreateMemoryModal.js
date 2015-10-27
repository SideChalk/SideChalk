import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class MemoryModal extends React.Component {
  const memoryTypes = {
    text: 'Text',
    music: 'Music',
    drawing: 'Drawing'
  };

  propTypes = {

  };

  render () {
    return (
      <Modal >
        <div className="memory-modal">
          <Modal.Header>
            <Modal.Title className="memory-modal-title">New {memoryTypes.text} Memory</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body"></Modal.Body>
          <Modal.Footer className="memory-modal-footer"></Modal.Footer>
        </div>
      </Modal>
    )
  }
}
