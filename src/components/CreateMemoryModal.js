import React from 'react';
import { Modal, Button, Input, ListGroup, ListGroupItem, Image, Label } from 'react-bootstrap';
import $ from 'jquery';

export default class CreateMemoryModal extends React.Component {
  static propTypes = {
    modalType: React.PropTypes.string,
    modalState: React.PropTypes.string,
    dismissCreateMemory: React.PropTypes.func,
    sendMemory: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      musicOptions: [],
      musicChoice: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitMemory = this.submitMemory.bind(this);
  }

  memoryTypes = {
    text: 'Text',
    music: 'Music',
    drawing: 'Drawing'
  };

  closeModal() {
    this.setState({
      musicOptions: [],
      musicChoice: null
    });
    this.props.dismissCreateMemory();
  }

  searchForMusic() {
    $.ajax({
      url: 'https://itunes.apple.com/search',
      data: {
        media: 'music',
        entity: 'song',
        limit: 6,
        term: this.refs.musicQuery.refs.input.value
      },
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true
    })
    .done((response) => {
      this.setState({musicOptions: response.results});
    })
    .fail((err) => {
      console.log('iTunes API FAIL:', err);
    });
  }

  startStreaming(musicInfo) {
    this.setState({musicChoice: musicInfo});
  }

  submitMemory() {
    const title = this.refs.title.refs.input.value;
    const priv = this.refs.priv.refs.input.checked;
    let data = null;

    if (this.props.modalType === 'text') {
      data = this.refs.data.refs.input.value;
    } else if (this.props.modalType === 'music') {
      data = this.state.musicChoice;
    } else if (this.props.modalType === 'drawing') {
      // data = some kind of drawing info
    }

    this.props.sendMemory({data: data, title: title, type: this.props.modalType}, priv.checked);
    this.closeModal();
  }

  renderContentInput() {
    if (this.props.modalType === 'text') {
      return this.renderTextInput();
    }
    if (this.props.modalType === 'music') {
      return this.renderMusicInput();
    }
    if (this.props.modalType === 'drawing') {
      return this.renderDrawingInput();
    }
  }

  renderTextInput() {
    return (
      <Input
        type='textarea'
        style={{minHeight: 200}}
        ref='data'
        placeholder='Tell me, liebling, what is on your mind?' />
    );
  }

  renderMusicInput() {
    const previewUrl = this.state.musicChoice ? this.state.musicChoice.previewUrl : null;
    const artistName = this.state.musicChoice ? this.state.musicChoice.artistName : null;
    const trackName = this.state.musicChoice ? this.state.musicChoice.trackName : null;

    return (
      <div>
        <Input
          type='text'
          ref='musicQuery'
          placeholder='Stuck in your head?' />
        <Button onClick={()=>this.searchForMusic()}>Find Matches</Button>
        <div style={{width: '50%', float: 'right'}}>
          <h5>Current Selection:</h5>
          <em>{artistName} -- {trackName}</em>
          <audio src={previewUrl} autoPlay controls label='Selection Preview'/>
        </div>
        <ListGroup>
        {this.state.musicOptions.map((option) => {
          if (option.previewUrl && option.isStreamable) {
            return (
              <ListGroupItem onClick={()=>this.startStreaming(option)} key={option.trackId}>
                <Image src={option.artworkUrl30} rounded
                  style={{marginRight: 5}}/>
                <Label>{option.artistName} -- {option.trackName}</Label>
              </ListGroupItem>
            );
          } else {
            return '';
          }
        })}
        </ListGroup>

      </div>
    );
  }

  renderDrawingInput() {
    return (
      'DRAWING '
    );
  }

  renderTitleInput() {
    return (
      <Input
        type='text'
        ref='title'
        placeholder='Title' />
    );
  }

  render () {
    let showModal = false;
    if (this.props.modalType) {
      showModal = true;
      if (this.props.modalType === 'hide') {
        showModal = false;
      }
    }

    /* TODO: render correct memory fields based on memory type */

    return (
      <Modal show={ showModal }
             onHide={this.closeModal}>
        <div className="memory-modal">
          <Modal.Header className="memory-modal-title">
            <Modal.Title>New {this.memoryTypes[this.props.modalType]} Memory</Modal.Title>
          </Modal.Header>
          <Modal.Body className="memory-modal-body">
            { this.renderTitleInput() }
            <Input
                className='message-private'
                type='checkbox'
                label='Private?'
                ref='priv'
                style={{color: '#BF4E30', textAlign: 'right'}}
                placeholder='Memory..'/>
            { this.renderContentInput() }
          </Modal.Body>
          <Modal.Footer className="memory-modal-footer">
            <Button
              className='add-memory-btn'
              onClick={() => this.submitMemory()}>
              Add
            </Button>
            <Button
              className='close-modal-btn'
              onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}
// const mapStateToProps = (state) => ({
//   userUID: state.getIn(['auth', 'uid'])
// });
// const mapDispatchToProps = (dispatch) => ({
//   sendMemory : bindActionCreators(sendMemory, dispatch)
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CreateMemoryModal);

