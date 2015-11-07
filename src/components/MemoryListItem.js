import React, { PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import Radium from 'radium';

import { reactionTypes } from '../actions/firebaseVars';
import { getColorFromReactions, getOpacity } from '../utils/colorUtils';

// TODO: Remove this when we validate memories.
// Using this so app doesnt crash when content isnt fully defined
const sampleMemory = {
  content: {title:'hello', data: 'world', type: 'text'}
};

// TEMP - TODO: set dynamically?
// const VISIBILITY_LIMIT = defaultRadius;
const iconInfo = {};
for (let i = 0; i < reactionTypes.length; i++) {
  iconInfo[reactionTypes[i]] = `fa-${reactionTypes[i]}-o`;
}

@Radium
export class MemoryListItem extends React.Component {

  static propTypes = {
    memory: PropTypes.object,
    onClick: PropTypes.func
  }
  renderIcon(type, secret) {
    const icons = [];
    if (type === 'text') {
      icons.push( <i className="fa fa-comment-o pull-right type-icon" key="type"></i> );
    } else if (type === 'music') {
      icons.push( <i className="fa fa-music pull-right type-icon" key="type"></i> );
    } else if (type === 'drawing') {
      icons.push( <i className="fa fa-magic pull-right type-icon" key="type"></i> );
    }
    if (secret) {
      icons.push( <i className="fa fa-user-secret pull-right text-info private-icon" key="private"></i> );
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

    if (icons.length === 0) {
      return <i className="fa fa-heart pull-left list-reaction-icon" key="heart"> 0</i>;
    } else {
      return icons;
    }
  }

  render() {
    const {memory} = this.props;
    memory.content = { ...sampleMemory.content, ...memory.content };

    const signalStrength = getOpacity(memory);
    // if (signalStrength === 0) {
    //   return null;
    // }

    const rgbString = memory.reactions ? getColorFromReactions(memory.reactions) : 'white';
    return (
      <div style={[
        {
          opacity: signalStrength,
          margin: '3px 0px',
          borderRadius: '4px',
          ':hover': {
            boxShadow: '0px 0px 10px ' + rgbString,
            textShadow: '1px 1px 5px ' + rgbString
          },
          ':focus': {
            boxShadow: '0px 0px 10px ' + rgbString,
            textShadow: '1px 1px 5px ' + rgbString
          },
          ':active': {
            boxShadow: '0px 0px 10px ' + rgbString,
            textShadow: '1px 1px 5px ' + rgbString
          },
          verticalAlign: 'middle'
        }
      ]} >
        <ListGroupItem style={{margin: 0, textShadow: 'inherit'}} onClick={this.props.onClick}>
          <div style={{color: rgbString,
                       textShadow: '1px 1px 5px ' + rgbString}}>
            {this.renderIcon(memory.content.type, memory.private)}
          </div>
          <h4 className="list-group-item-heading">{memory.content.title}</h4>
          {this.renderReactions(memory.reactions)}
        </ListGroupItem>
      </div>
    );
  }
}

export default MemoryListItem;
