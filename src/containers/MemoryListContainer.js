import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import MemoryList from 'components/MemoryList.js';
import * as actionCreators from 'actions/actions.js';

export class MemoryListContainer extends React.Component {

  static propTypes = {
    memories: React.PropTypes.object,
    actions: React.PropTypes.object
  }

  componentDidMount() {
    this.props.actions.syncData();
  }

  handleClick() {
    const node = this.refs.input;
    const text = node.value.trim();
    this.props.actions.sendMemory(text, [45, 65]);
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
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryListContainer);
