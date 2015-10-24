import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';

import MemoryListItem from 'components/MemoryListItem.js';
import MemoryModal from 'components/MemoryModal';

class MemoryList extends React.Component {

  static propTypes = {
    memories: PropTypes.array,
    memoryModalState: PropTypes.shape({
      memoryInFocus: PropTypes.object,
      showMemoryModal: PropTypes.boolean
    }),
    memoryModalActions: PropTypes.shape({
      showMemoryDetails: PropTypes.func,
      dismissMemoryDetails: PropTypes.func
    })
  }

  handleClick(memory) {
    this.props.memoryModalActions.showMemoryDetails(memory);
  }

  render() {
    const { memories, memoryModalState, memoryModalActions } = this.props;
    const memoryModal = memoryModalState.showMemoryModal ? (
      <MemoryModal
        memoryModalState={memoryModalState}
        memoryModalActions={memoryModalActions} />
      )
      : null;

    return (
      <div>
        <ListGroup className="memory-list">
          {memories.map( (memory) => {
            return (
              <div key={memory.key} onClick={()=>this.handleClick(memory)} >
                <MemoryListItem memory={memory} />
              </div>);
          })}
        </ListGroup>
        {memoryModal}
      </div>
    );
  }

}

export default MemoryList;
