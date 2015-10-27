import React, { PropTypes } from 'react';
import { ListGroup, Alert } from 'react-bootstrap';

import MemoryListItem from 'components/MemoryListItem.js';
import MemoryModal from 'components/MemoryModal';

export class MemoryList extends React.Component {

  static propTypes = {
    memories: PropTypes.array,
    memoryModalState: PropTypes.shape({
      memoryInFocus: PropTypes.object,
      showMemoryModal: PropTypes.boolean
    }),
    memoryModalActions: PropTypes.shape({
      showMemoryDetails: PropTypes.func,
      dismissMemoryDetails: PropTypes.func
    }),
    loading: PropTypes.bool
  }

  handleClick(memory) {
    this.props.memoryModalActions.showMemoryDetails(memory);
  }

  renderListItems() {
    const { memories, loading } = this.props;

    if (loading) {
      return <i className="fa fa-spinner fa-spin fa-2x"></i>;
    } else if (memories.length === 0) {
      return (
        <Alert bsStyle="warning">
          There are no memories in your location
        </Alert>
      );
    } else {
      return memories.map((memory) =>
        <MemoryListItem memory={memory} key={memory.key} onClick={()=>this.handleClick(memory)} />
      );
    }
  }

  render() {
    const { memoryModalState, memoryModalActions } = this.props;
    const memoryModal = memoryModalState.showMemoryModal ? (
      <MemoryModal
        memoryModalState={memoryModalState}
        memoryModalActions={memoryModalActions} />
      )
      : null;

    return (
      // <div>
        <ListGroup componentClass="ul" className="memory-list">
          {this.renderListItems()}
          {memoryModal}
        </ListGroup>
      // </div>
    );
  }

}

export default MemoryList;
