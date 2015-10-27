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
  renderIcon(type) {
    if (type === 'text') {
      return <i className="fa fa-comment-o pull-right fa-2x"></i>;
    }
    if (type === 'music') {
      return <i className="fa fa-music pull-right fa-2x"></i>;
    }
  }
  render() {
    const {memory} = this.props;
    memory.content = { ...sampleMemory.content, ...memory.content };
    return (
        <ListGroupItem onClick={this.props.onClick}
                       style={{opacity: 1 - (memory.distance / VISIBILITY_LIMIT)}} >
          {this.renderIcon(memory.content.type)}
          <h4 className="list-group-item-heading">{memory.content.title}</h4>
          <p className="list-group-item-text">REACTIONS</p>
        </ListGroupItem>
    );
  }
}

export default MemoryListItem;
