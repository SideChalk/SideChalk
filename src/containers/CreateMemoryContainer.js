import React                  from 'react';
// import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import CreateMemoryButton from 'components/CreateMemoryButton.js';
// import { sendMemory } from 'actions/memoryActions.js';

export class CreateMemoryContainer extends React.Component {

  static propTypes = {
    sendMemory: React.PropTypes.func,
    toggleLoginModal: React.PropTypes.func,
    userUID: React.PropTypes.string
  }

  handleClick() {
    if (this.props.userUID === null) {
      this.props.toggleLoginModal();
    } else {
      const node = this.refs.input.refs.input;
      const text = node.value.trim();
      this.props.sendMemory({data: text, title: 'title', type: 'text'}, [45, 65]);
      node.value = '';
    }
  }

  login() {
    this.props.toggleLoginModal();
  }

  render() {
    // const {memories, memoryModalState} = this.props;

    return (
      <Grid>
        <Row>
          <Col md={1}>
            <CreateMemoryButton memType="text"/>
          </Col>
          <Col md={1}>
            <CreateMemoryButton memType="music"/>
          </Col>
          <Col md={1}>
            <CreateMemoryButton memType="drawing"/>
          </Col>
        </Row>
        
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  // memories : state.get('memories'),
  // memoryModalState : state.get('memoryModals'),
  // userUID: state.getIn(['auth', 'uid'])
});
const mapDispatchToProps = (dispatch) => ({
  // toggleLoginModal : bindActionCreators(toggleLoginModal, dispatch),
  // sendMemory : bindActionCreators(sendMemory, dispatch),
  // login : bindActionCreators(login, dispatch),
  // logout : bindActionCreators(logout, dispatch),
  // showMemoryDetails : bindActionCreators(showMemoryDetails, dispatch),
  // dismissMemoryDetails : bindActionCreators(dismissMemoryDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMemoryContainer);
