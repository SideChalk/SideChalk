import React, { PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';

import { defaultRadius, reactionTypes } from '../actions/firebaseVars';

// TODO: Remove this when we validate memories.
// Using this so app doesnt crash when content isnt fully defined
const sampleMemory = {
  content: {title:'hello', data: 'world', type: 'text'}
};

// TEMP - TODO: set dynamically?
const VISIBILITY_LIMIT = defaultRadius;
const iconInfo = {};
for (let i = 0; i < reactionTypes.length; i++){
  let iconRef = `fa-${reactionTypes[i]}-o`
  iconInfo[reactionTypes[i]] = iconRef;
}

export class MemoryListItem extends React.Component {

  static propTypes = {
    memory: PropTypes.object,
    onClick: PropTypes.func
  }
  renderIcon(type, secret) {
    const icons = [];
    if (type === 'text') {
      icons.push( <i className="fa fa-comment-o pull-right fa-2x type-icon" key="type"></i> );
    } else if (type === 'music') {
      icons.push( <i className="fa fa-music pull-right fa-2x type-icon" key="type"></i> );
    }
    if (secret) {
      icons.push( <i className="fa fa-user-secret pull-right fa-2x text-info private-icon" key="private"></i> );
    }
    return icons;
  }

  renderReactions(reactions) {
    if (!reactions) {
      return <i className="fa fa-heart pull-left list-reaction-icon" key="heart"> 0</i>;
    }


    const icons = [];

    Object.keys(iconInfo).forEach(reaction => {
      const count = reactions[reaction];
      if (count) {
        icons.push((
          <i className={'fa pull-left list-reaction-icon ' + iconInfo[reaction]}
            key={reaction}>
             {' ' + count}
          </i>
        ));
      }
    });
    return icons;
  }

  render() {
    const {memory} = this.props;
    memory.content = { ...sampleMemory.content, ...memory.content };
    return (
        <ListGroupItem onClick={this.props.onClick}
                       style={{opacity: 1 - (memory.distance / VISIBILITY_LIMIT)}} >
          {this.renderIcon(memory.content.type, memory.private)}
          <h4 className="list-group-item-heading">{memory.content.title}</h4>
          {this.renderReactions(memory.reactions)}
        </ListGroupItem>
    );
  }
}

export default MemoryListItem;
