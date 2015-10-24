import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Button, Input, Grid, Row, Col } from 'react-bootstrap';

import MemoryList from 'components/MemoryList.js';
import { sendMemory } from 'actions/memoryActions.js';
import { login, logout } from 'actions/authActions.js';

export class MemoryListContainer extends React.Component {

  static propTypes = {
    memories: React.PropTypes.object,
    sendMemory: React.PropTypes.func,
    login: React.PropTypes.func,
    logout: React.PropTypes.func
  }

  handleClick() {
    const node = this.refs.input.refs.input;
    const text = node.value.trim();
    debugger;
    this.props.sendMemory({data: text, title: 'title', type: 'text'}, [45, 65]);
    node.value = '';
  }

  login() {
    this.props.login('github');
  }

  render() {
    const {memories} = this.props;

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
            <MemoryList memories={memories.toJS()} />
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
  memories : state.memories
});
const mapDispatchToProps = (dispatch) => ({
  sendMemory : bindActionCreators(sendMemory, dispatch),
  login : bindActionCreators(login, dispatch),
  logout : bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryListContainer);
