import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Button, Grid, Row, ButtonToolbar } from 'react-bootstrap';

import MemoryList from 'components/MemoryList.js';
import { sendMemory } from 'actions/memoryActions.js';
import { showMemoryDetails, dismissMemoryDetails } from 'actions/memoryModalActions.js';
import { toggleLoginModal } from 'actions/authActions.js';

export class MemoryListContainer extends React.Component {

  static propTypes = {
    memories: React.PropTypes.object,
    sendMemory: React.PropTypes.func,
    showMemoryDetails: React.PropTypes.func,
    dismissMemoryDetails: React.PropTypes.func,
    toggleLoginModal: React.PropTypes.func,
    memoryModalState: React.PropTypes.object,
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

  render() {
    const {memories, memoryModalState} = this.props;
    const memoryModalActions = {
      showMemoryDetails: this.props.showMemoryDetails,
      dismissMemoryDetails: this.props.dismissMemoryDetails
    };

    return (
      <Grid>
        <Row className="show-grid">
            <ButtonToolbar>
              <Button style={{float:'none'}}
                className='btn'
                onClick={() => this.handleClick()}>
                Add Memory
              </Button>
            </ButtonToolbar>
        </Row>
        <br />
        <Row className="show-grid">
            <MemoryList
              memories={memories.toJS()}
              memoryModalState={memoryModalState.toJS()}
              memoryModalActions={memoryModalActions} />
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  memories : state.get('memories'),
  memoryModalState : state.get('memoryModals'),
  userUID: state.getIn(['auth', 'uid'])
});
const mapDispatchToProps = (dispatch) => ({
  toggleLoginModal : bindActionCreators(toggleLoginModal, dispatch),
  sendMemory : bindActionCreators(sendMemory, dispatch),
  showMemoryDetails : bindActionCreators(showMemoryDetails, dispatch),
  dismissMemoryDetails : bindActionCreators(dismissMemoryDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryListContainer);
