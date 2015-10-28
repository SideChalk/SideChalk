import React, { PropTypes } from 'react';
import { ListGroup, Alert } from 'react-bootstrap';

import MemoryListItem from 'components/MemoryListItem.js';

export class MemoryList extends React.Component {

  static propTypes = {
    memories: PropTypes.array,
    showMemoryDetails: PropTypes.func,
    loading: PropTypes.bool
  }

  handleClick(memory) {
    this.props.showMemoryDetails(memory);
  }

  renderListItems() {
    const { memories, loading } = this.props;

    if (loading) {
      return <i className="fa fa-spinner fa-spin fa-2x"></i>;
    } else if (memories.length === 0) {
      return (
        <Alert bsStyle="info">
          There are no memories near you
        </Alert>
      );
    } else {
      return memories.map((memory) =>
        <MemoryListItem memory={memory} key={memory.key} onClick={()=>this.handleClick(memory)} />
      );
    }
  }

  render() {
    return (
      <ListGroup componentClass="ul" className="memory-list">
        {this.renderListItems()}
      </ListGroup>
    );
  }

}

export default MemoryList;
