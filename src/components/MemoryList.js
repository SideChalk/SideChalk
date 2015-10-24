import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';

import MemoryListItem from 'components/MemoryListItem.js';

class MemoryList extends React.Component {

  static propTypes = {
    memories: PropTypes.array
  }

  render() {
    const {memories} = this.props;
    return (
      <ListGroup className="memory-list">
        {memories.map( (memory) => (
          <MemoryListItem key={memory.key} memory={memory} />
        ))}
      </ListGroup>
    );
  }
}

export default MemoryList;
