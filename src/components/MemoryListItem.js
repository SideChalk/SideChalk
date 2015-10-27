import React, { PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';

// TODO: Remove this when we validate memories.
// Using this so app doesnt crash when content isnt fully defined
const sampleMemory = {
  content: {title:'hello', data: 'world', type: 'text'}
};

// TEMP - TODO: set dynamically?
const VISIBILITY_LIMIT = 150;

export class MemoryListItem extends React.Component {

  static propTypes = {
    memory: PropTypes.object,
    onClick: PropTypes.func
  }

  render() {
    const {memory} = this.props;
    memory.content = { ...sampleMemory.content, ...memory.content };
    return (
        <ListGroupItem header={memory.content.title} bsSize="lg" onClick={this.props.onClick}
                       style={{opacity: 1 - (memory.distance / VISIBILITY_LIMIT)}} >
          REACTIONS
        </ListGroupItem>
    );
  }
}

export default MemoryListItem;
