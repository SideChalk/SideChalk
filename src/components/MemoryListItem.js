import React, { PropTypes } from 'react';

// TODO: Remove this when we validate memories.
// Using this so app doesnt crash when content isnt fully defined
const sampleMemory = {
  content: {title:'hello', data: 'world', type: 'text'}
};

class MemoryListItem extends React.Component {

  static propTypes = {
    memory: PropTypes.object
  }

  render() {
    const {memory} = this.props;
    memory.content = { ...sampleMemory.content, ...memory.content };
    return (
      <li className="memory-list-item">
        <h5 className="memory-list-item-title">{memory.content.title}</h5>
        <p className="memory-list-item-data">{memory.content.data}</p>
        <footer className="memory-footer">
          {memory.distance}
        </footer>
      </li>
    );
  }
}

export default MemoryListItem;
