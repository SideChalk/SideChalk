import React from 'react';
import { Modal, Button, Input, ListGroup, ListGroupItem, Image, Label } from 'react-bootstrap';
import $ from 'jquery';
import { Surface, Shape, Path } from 'react-art';

export default class CreateMemoryModal extends React.Component {

  // GENERAL
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
      musicChoice: null,
      currentPaths: [],
      savedShapes: []
    };
    this.memoryTypes = {
      text: 'Text',
      music: 'Music',
      drawing: 'Drawing'
    };

    this.closeModal = this.closeModal.bind(this);
    this.submitMemory = this.submitMemory.bind(this);

    this.dragging = false;
    this.lastPoint = null;
    this.points = [];
    this.bR = null;
    this.chalkColor = '#DBBB79';
  }

  componentDidMount() {
    document.addEventListener('mousemove', (e)=>{this.handleMouseMove(e);}, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', (e)=>{this.handleMouseMove(e);}, false);
  }

  closeModal() {
    this.setState({
      musicOptions: [],
      musicChoice: null,
      currentPaths: [],
      savedShapes: []
    });
    this.props.dismissCreateMemory();
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
      data = this.refs.surface.getDOMNode().toDataURL();
    }

    this.props.sendMemory({data: data, title: title, type: this.props.modalType}, priv.checked);
    this.closeModal();
  }

  // DRAWING EVENTS
  handleMouseDown(e) {
    // toggle 'dragging' mode
    this.dragging = true;
    // get relative location of cursor
    this.bR = this.refs.drawingWrapper.getBoundingClientRect();
    const pageX = e.pageX || e.nativeEvent.touches[0].pageX;
    const pageY = e.pageY || e.nativeEvent.touches[0].pageY;
    const relativeLoc = {
      x: pageX - this.bR.left,
      y: pageY - this.bR.top
    };
    this.lastPoint = relativeLoc;
    this.points.push(relativeLoc);
  }

  handleMouseUp() {
    // stop "dragging"
    this.dragging = false;

    // save current path (finished mouse action) as a full "shape"
    if (this.points.length > 1) {
      const p = new Path().moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        p.lineTo(this.points[i].x, this.points[i].y);
      }
      const shape = (<Shape
              stroke={this.chalkColor}
              d={p}
              strokeWidth={3} />);
      this.points = [];
      this.setState({
        savedShapes: this.state.savedShapes.concat([shape]),
        currentPaths: []
      });
    }
  }

  handleMouseMove(e) {
    if (this.props.modalType === 'drawing' && this.dragging) {
      e.preventDefault();
      const pageX = e.pageX || e.nativeEvent.touches[0].pageX;
      const pageY = e.pageY || e.nativeEvent.touches[0].pageY;
      const relativeLoc = {
        x: pageX - this.bR.left,
        y: pageY - this.bR.top
      };
      // store points in path for proper storage later
      this.points.push(relativeLoc);

      // treat leaving bounds as a mouseUp (to avoid bug of releasing click off canvas but leaving drawing mode on)
      if (relativeLoc.x < 0 ||
          relativeLoc.y < 0 ||
          relativeLoc.x > this.bR.right - this.bR.left ||
          relativeLoc.y > this.bR.bottom - this.bR.top) {
        this.handleMouseUp(e);
      }
      // live draw line so far as temporary set of micropaths
      const p = new Path()
              .moveTo(this.lastPoint.x, this.lastPoint.y)
              .lineTo(relativeLoc.x, relativeLoc.y);
      this.lastPoint = relativeLoc;
      this.setState({
        currentPaths: this.state.currentPaths.concat([p])
      });
    }
  }

  // MUSIC ACTIONS
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

  // RENDERING
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

  renderTitleInput() {
    return (
      <Input
        type='text'
        ref='title'
        placeholder='Title' />
    );
  }

  // TEXT
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
    const pastShapes = this.state.savedShapes.map((shape)=>{return shape;});
    const currentLine = this.state.currentPaths.map((microPath) => {
      return (<Shape
        stroke={this.chalkColor}
        d={microPath}
        strokeWidth={3} />);
    });

    return (<div>
      <div
        ref='drawingWrapper'
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseUp={() => this.handleMouseUp()}
        onTouchStart={(e) => this.handleMouseDown(e)}
        onTouchEnd={() => this.handleMouseUp()}
        onTouchMove={(e) => this.handleMouseMove(e)}
        style={{height: '250px',
                width: '250px',
                display: 'block', margin: '0 auto'}}>
        <Surface ref='surface'
          id='burrr'
          height={250}
          width={250}
          style={{backgroundImage: 'url(../assets/concrete.jpg)',
                border: '1px solid #444',
                boxShadow: '2px 2px 3px #222',
                borderRadius: '6px',
                cursor: 'url(../assets/magic.png) 2 20, auto'}}>
          {pastShapes}
          {currentLine}
        </Surface>
      </div>
      <div style={{margin: '10px auto', display: 'block', textAlign:'center'}}>
        <Button style={{background: '#c4adc9', margin: '1px'}}
                onClick={() => this.chalkColor = '#c4adc9'} />
        <Button style={{background: '#ed7777', margin: '1px'}}
                onClick={() => this.chalkColor = '#ed7777'} />
        <Button style={{background: '#fad48b', margin: '1px'}}
                onClick={() => this.chalkColor = '#fad48b'} />
        <Button style={{background: '#f5f9ad', margin: '1px'}}
                onClick={() => this.chalkColor = '#f5f9ad'} />
        <Button style={{background: '#bcdf8a', margin: '1px'}}
                onClick={() => this.chalkColor = '#bcdf8a'} />
        <Button style={{background: '#94c0cc', margin: '1px'}}
                onClick={() => this.chalkColor = '#94c0cc'} />
        <Button style={{background: '#f6f4f1', margin: '1px'}}
                onClick={() => this.chalkColor = '#f6f4f1'} />
        <Button style={{background: '#6fe7db', margin: '1px'}}
                onClick={() => this.chalkColor = '#6fe7db'} />
        <Button style={{background: '#444243', margin: '1px'}}
                onClick={() => this.chalkColor = '#444243'} />
        <Button style={{background: '#f2a3bd', margin: '1px'}}
                onClick={() => this.chalkColor = '#f2a3bd'} />
        <Button style={{background: 'maroon', margin: '1px'}}
                onClick={() => this.chalkColor = 'maroon'} />
        <Button style={{background: 'purple', margin: '1px'}}
                onClick={() => this.chalkColor = 'purple'} />
      </div>
    </div>);
  }

  // RENDER ALL
  render () {
    let showModal = false;
    if (this.props.modalType) {
      showModal = true;
      if (this.props.modalType === 'hide') {
        showModal = false;
      }
    }

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
