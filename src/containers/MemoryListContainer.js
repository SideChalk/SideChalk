import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Button, Input, Grid, Row, Col } from 'react-bootstrap';

import MemoryList from 'components/MemoryList.js';
import { sendMemory } from 'actions/memoryActions.js';
import { login, logout } from 'actions/authActions.js';
import { showMemoryDetails, dismissMemoryDetails } from 'actions/memoryModalActions.js';

export class MemoryListContainer extends React.Component {

  static propTypes = {
    memories: React.PropTypes.object,
    sendMemory: React.PropTypes.func,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    showMemoryDetails: React.PropTypes.func,
    dismissMemoryDetails: React.PropTypes.func,
    memoryModalState: React.PropTypes.shape({
      memoryInFocus: React.PropTypes.object,
      showMemoryModal: React.PropTypes.boolean
    })
  }

  handleClick() {
    const node = this.refs.input.refs.input;
    const text = node.value.trim();
    this.props.sendMemory({data: text, title: 'title', type: 'text'}, [45, 65]);
    node.value = '';
  }

  login() {
    this.props.login('github');
  }

  render() {
    const {memories, memoryModalState} = this.props;
    const memoryModalActions = {
      showMemoryDetails: this.props.showMemoryDetails,
      dismissMemoryDetails: this.props.dismissMemoryDetails
    };

    return (
      <Grid>
        <Row>
          <Col md={1}>
            <Button
              className='btn'
              onClick={() => this.login()}>
              Login
            </Button>
          </Col>
          <Col md={1}>
            <Button
              className='btn'
              onClick={() => this.props.logout()}>
              Logout
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <MemoryList
              memories={memories.toJS()}
              memoryModalState={memoryModalState}
              memoryModalActions={memoryModalActions} />
          </Col>
          <form>
            <Col md={3}>
              <Input
                className='message-input'
                type='text'
                ref='input' />
            </Col>
            <Col md={1}>
              <Button
                className='btn'
                onClick={() => this.handleClick()}>
                Add
              </Button>
            </Col>
          </form>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  memories : state.memories,
  memoryModalState : state.memoryModals.toJS()
});
const mapDispatchToProps = (dispatch) => ({
  sendMemory : bindActionCreators(sendMemory, dispatch),
  login : bindActionCreators(login, dispatch),
  logout : bindActionCreators(logout, dispatch),
  showMemoryDetails : bindActionCreators(showMemoryDetails, dispatch),
  dismissMemoryDetails : bindActionCreators(dismissMemoryDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryListContainer);
