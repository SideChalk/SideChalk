import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { CreateMemoryButton } from 'components/CreateMemoryButton.js';
import CreateMemoryModal from 'components/CreateMemoryModal.js';
import { sendMemory } from 'actions/memoryActions.js';
import { createMemory, dismissCreateMemory } from 'actions/memoryModalActions.js';
import { toggleLoginModal } from 'actions/authActions.js';


export class CreateMemoryContainer extends React.Component {

  static propTypes = {
    sendMemory: React.PropTypes.func,
    toggleLoginModal: React.PropTypes.func,
    userUID: React.PropTypes.string,
    createMemory: React.PropTypes.func,
    dismissCreateMemory: React.PropTypes.func,
    modalType: React.PropTypes.string
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={2}>
            <CreateMemoryButton
              memType="text"
              createMemory={this.props.createMemory}
              toggleLoginModal={this.props.toggleLoginModal}
              userUID={this.props.userUID} />
          </Col>
          <Col md={2}>
            <CreateMemoryButton
              memType="music"
              createMemory={this.props.createMemory}
              toggleLoginModal={this.props.toggleLoginModal}
              userUID={this.props.userUID} />
          </Col>
          <Col md={2}>
            <CreateMemoryButton
              memType="drawing"
              createMemory={this.props.createMemory}
              toggleLoginModal={this.props.toggleLoginModal}
              userUID={this.props.userUID} />
          </Col>
        </Row>
        <CreateMemoryModal
          sendMemory={this.props.sendMemory}
          dismissCreateMemory={this.props.dismissCreateMemory}
          modalType={this.props.modalType} />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  // memories : state.get('memories'),
  // memoryModalState : state.get('memoryModals'),
  modalType: state.getIn(['memoryModals', 'modalType']),
  userUID: state.getIn(['auth', 'uid'])
});
const mapDispatchToProps = (dispatch) => ({
  toggleLoginModal : bindActionCreators(toggleLoginModal, dispatch),
  sendMemory : bindActionCreators(sendMemory, dispatch),
  dismissCreateMemory : bindActionCreators(dismissCreateMemory, dispatch),
  // login : bindActionCreators(login, dispatch),
  // logout : bindActionCreators(logout, dispatch),
  // showMemoryDetails : bindActionCreators(showMemoryDetails, dispatch),
  createMemory : bindActionCreators(createMemory, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMemoryContainer);
