import React, { Component, PropTypes } from 'react';
import { Modal, Button, Image }        from 'react-bootstrap';
import * as moment                     from 'moment';
import {reactionTypes, reactionsRef}                 from '../actions/firebaseVars.js';
import { connect }                     from 'react-redux';
import { rateMemory, unrateMemory}     from '../actions/memoryActions.js';
import { bindActionCreators }          from 'redux';

export class MemoryModal extends Component {
  static propTypes = {
    userUID: React.PropTypes.string,
    rateMemory: React.PropTypes.func,
    unrateMemory: React.PropTypes.func
  };  // getInitialState() {

  constructor(props) {
    super(props);
    this.state = {
      counts: props.memoryModalState.memoryInFocus.reactions || {},
      initialVotedOn: {},
      loading:true
    };
  }

  componentWillMount() {
    if (this.props.userUID === null) {
      // User not logged in
      return;
    }
    const memoryKey = this.props.memoryModalState.memoryInFocus.key;
    const reactionsFromServer = reactionsRef.child(memoryKey);
    const currentUser = this.props.userUID;

    reactionsFromServer.once('value', (snapshot) => {
      const result = snapshot.val();
      if (snapshot.val() !== null) {
        if (result[currentUser]) {
          // TODO: Refactor using spread operator
          const votes = result[currentUser];
          /* eslint guard-for-in: [0] */
          for (const vote in votes) {
            const initialVotedOn = {
              ...this.state.initialVotedOn,
              [vote]: votes[vote]
            };
            this.setState({...this.state, initialVotedOn});
          }
          const loading = false;
          this.setState({...this.state, loading});
        }
      }
    }, () => {
      const loading = false;
      this.setState({...this.state, loading});
    });
  }
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
    if (this.props.userUID === null) {
      // User not logged in
      return;
    }
    const key = payload.key;
    const reactionType = payload.reactionType;
    let reactionCount = payload.reactionCount;

    if (this.state.initialVotedOn[reactionType]) {
      this.props.unrateMemory(key, reactionType);
      reactionCount--;
      const initialVotedOn = {
        ...this.state.initialVotedOn,
        [reactionType]: null
      };
      const counts = {...this.state.counts, [reactionType]: reactionCount};
      this.setState({...this.state, initialVotedOn, counts});
    } else {
      this.props.rateMemory(key, reactionType);
      reactionCount++;
      const initialVotedOn = {
        ...this.state.initialVotedOn,
        [reactionType]: true
      };
      const counts = {...this.state.counts, [reactionType]: reactionCount};
      this.setState({...this.state, initialVotedOn, counts});
    }
  }

  fetchReactions (memoryObj) {
    const output = [];
    for (let i = 0; i < reactionTypes.length; i++) {
      const classRef = reactionTypes[i];
      const reactionCount = this.state.counts[classRef] || 0;
      let classnames = `fa fa-${classRef}-o fa-border fa-2x`;
      if (this.state.initialVotedOn[classRef]) {
        classnames += ` votedOn`;
      }
      output.push(
         <i key={i} className={classnames}
         /* eslint no-loop-func: [0] */
           onClick={() =>
             this.reactionHandler({
               key:memoryObj.key,
               reactionType: classRef,
               reactionCount: reactionCount,
               elementKey: i,
               context:this})}>
              { this.state.counts[classRef] || 0 }
           </i>);
    }
    return output;
  }

  render () {
    const { memoryModalState, memoryModalActions } = this.props;
    const memory = memoryModalState.memoryInFocus;
    const dismissMemoryDetails = memoryModalActions.dismissMemoryDetails;

    let memoryBody = null;
    if (memory.content.type === 'text') {
      memoryBody = memory.content.data;
    } else if (memory.content.type === 'music') {
      const musicData = memory.content.data;
      memoryBody = (<div>
        <Image
          src={musicData.artworkUrl100} rounded
          style={{marginRight: 5}}/>
        <h2>{musicData.trackName}</h2>
        <h4>{musicData.artistName}</h4>
        <audio src={memory.content.data.previewUrl} autoPlay controls />
      </div>);
    } else if (memory.content.type === 'drawing') {
      memoryBody = (<Image src={memory.content.data}
                    rounded
                    style={{height: '300px',
                            width: '300px',
                            backgroundImage: 'url(../assets/concrete.jpg)',
                            border:'1px solid #444',
                            boxShadow:'2px 2px 3px #222',
                            display: 'block', margin: '0 auto'}} />);
    }

    return (
      <Modal show={memoryModalState.showMemoryModal}
             onHide={dismissMemoryDetails}
             style={{opacity: 1 - (memory.distance / 3000)}}>
        <div className="memory-modal">
          <Modal.Header className="memory-modal-title">
            <Modal.Title>{memory.content.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body">{memoryBody}</Modal.Body>
          <Modal.Footer className="memory-modal-footer">
           <div className="text-left">
            <div>
              { this.cleanDate(memory.createdAt) } ({ this.cleanDistance(memory.distance) })
            </div>
            <div>Reactions:</div>
               <div>
               { this.fetchReactions(memory) }
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

const mapDispatchToProps = (dispatch) => ({
  rateMemory: bindActionCreators(rateMemory, dispatch),
  unrateMemory: bindActionCreators(unrateMemory, dispatch)
});


const mapStateToProps = (state) => ({
  userUID: state.getIn(['auth', 'uid'])
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryModal);
