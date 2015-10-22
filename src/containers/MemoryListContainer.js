import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import MemoryList from 'components/MemoryList.js';
import { sendMemory } from 'actions/actions.js';

export class MemoryListContainer extends React.Component {

  static propTypes = {
    memories: React.PropTypes.object,
    sendMemory: React.PropTypes.func
  }

  handleClick() {
    const node = this.refs.input;
    const text = node.value.trim();
    this.props.sendMemory(text, [45, 65]);
    node.value = '';
  }

  render() {
    const {memories} = this.props;
    return (
      <div>
        <input type='text' ref='input' />
        <button
          onClick={() => this.handleClick()}>
          Add
        </button>
        <MemoryList memories={memories.toJS()} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  memories : state.memories
});
const mapDispatchToProps = (dispatch) => ({
  sendMemory : bindActionCreators(sendMemory, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryListContainer);
