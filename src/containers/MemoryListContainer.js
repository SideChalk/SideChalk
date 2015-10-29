import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Grid, Row } from 'react-bootstrap';

import MemoryList from 'components/MemoryList.js';
import { sendMemory } from 'actions/memoryActions.js';
import { showMemoryDetails } from 'actions/memoryModalActions.js';
import { toggleLoginModal } from 'actions/authActions.js';

export class MemoryListContainer extends React.Component {

  static propTypes = {
    memories: React.PropTypes.object,
    sendMemory: React.PropTypes.func,
    showMemoryDetails: React.PropTypes.func,
    toggleLoginModal: React.PropTypes.func,
    userUID: React.PropTypes.string,
    loading: React.PropTypes.bool
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
    const {memories, loading} = this.props;

    return (
      <Grid>
        <br />
        <Row className="show-grid">
            <MemoryList
              memories={memories.toJS()}
              showMemoryDetails={this.props.showMemoryDetails}
              loading={loading} />
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  memories : state.get('memories'),
  userUID: state.getIn(['auth', 'uid']),
  loading: state.get('loadingMemories')
});
const mapDispatchToProps = (dispatch) => ({
  toggleLoginModal : bindActionCreators(toggleLoginModal, dispatch),
  sendMemory : bindActionCreators(sendMemory, dispatch),
  showMemoryDetails : bindActionCreators(showMemoryDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryListContainer);
