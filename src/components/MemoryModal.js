import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as moment from 'moment';

export default class MemoryModal extends Component {

  cleanDate (input) {
    const rootDate = moment.default(input).fromNow();
    return rootDate;
  }

  cleanDistance (input) {
    const units = 'km';
    const distanceString = input.toFixed(2) + ' ' + units + ' away';
    return distanceString;
  }

  reactionHandler (payload) {
    const key = payload.key;
    const reactionType = payload.reactionType;

    console.log(key, reactionType);
  }

  fetchReactions (input){
    //Here we could probably query Firebase DB?
    if (!input) return;
 
    console.log("\n\n\n\n\n\n THIS IS INPUT:", input);
    
    return input.map((count, reaction) => {
      if (reaction === 'smile'){
        return (
          <i className="fa fa-smile-o pull-right fa-border fa-2x" 
            onClick={() => 
              this.reactionHandler({
                key:memory.key, 
                reactionType: reaction, 
                context:this})}> 
                {count}
            </i>);
      }else if( reaction === 'frown'){
        return (
          <i className="fa fa-frown-o pull-right fa-border fa-2x" 
            onClick={() => 
              this.reactionHandler({
                key:memory.key, 
                reactionType: reaction, 
                context:this})}> 
                {count}
            </i>);
      }else if( reaction === 'frown'){
        return (
          <i className="fa fa-frown-o pull-right fa-border fa-2x" 
            onClick={() => 
              this.reactionHandler({
                key:memory.key, 
                reactionType: reaction, 
                context:this})}> 
                {count}
            </i>);
      }

    });
    

  }


  render () {
    const { memoryModalState, memoryModalActions } = this.props;
    const memory = memoryModalState.memoryInFocus;
    const dismissMemoryDetails = memoryModalActions.dismissMemoryDetails;

    return (
      <Modal show={memoryModalState.showMemoryModal}
             onHide={dismissMemoryDetails}
             style={{opacity: 1 - (memory.distance / 3000)}}>
        <div className="memory-modal">
          <Modal.Header className="memory-modal-title">
            <Modal.Title>{memory.content.title}

            {memory.key}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body">{memory.content.data}</Modal.Body>
          <Modal.Footer className="memory-modal-footer">
           <div className="text-left">
            <div>
              { this.cleanDate(memory.createdAt) } ({ this.cleanDistance(memory.distance) })
            </div>
            <div>Reactions:</div>
              <div>

                { this.cleanDate(memory.createdAt) } ({ this.cleanDistance(memory.distance) })
              </div>
               <div>
                <div dangerouslySetInnerHTML={ this.fetchReactions(memory.reactions) }/>
                // <i className='fa fa-smile-o fa-2x fa-border' onClick={() => this.reactionHandler({key:memory.key, reactionType:'smile', context:this})}></i>
                // <i className='fa fa-frown-o fa-2x fa-border' onClick={() => this.reactionHandler({key:memory.key, reactionType:'frown', context:this})}></i>
                // <i className='fa fa-heart fa-2x fa-border' onClick={() => this.reactionHandler({key:memory.key, reactionType:'heart', context:this})}></i>

              </div>
           </div>
            <Button onClick={dismissMemoryDetails}>Close</Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }

}

MemoryModal.propTypes = {
  memoryModalState: PropTypes.shape({
    memoryInFocus: PropTypes.object,
    showMemoryModal: PropTypes.boolean
  }),
  memoryModalActions: PropTypes.shape({
    showMemoryDetails: PropTypes.func,
    dismissMemoryDetails: PropTypes.func
  })
};
