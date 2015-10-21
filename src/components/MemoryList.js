import React, { PropTypes } from 'react';
import MemoryListItem from 'components/MemoryListItem.js';

class MemoryList extends React.Component {

  static propTypes = {
    memories: PropTypes.array
  }

  render() {
    const {memories} = this.props;
    return (
      <ul className="memory-list">
        {memories.map( (memory) => (
          <MemoryListItem key={memory.key} memory={memory} />
        ))}
      </ul>
    );
  }
}

export default MemoryList;
