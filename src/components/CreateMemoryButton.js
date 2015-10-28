import React                  from 'react';
import { Button } from 'react-bootstrap';
// import { connect } from 'react-redux';


export class CreateMemoryButton extends React.Component {

  static propTypes = {
    memType: React.PropTypes.string,
    userUID: React.PropTypes.string,
    toggleLoginModal: React.PropTypes.func,
    createMemory: React.PropTypes.func
  }

  handleClick = () => {
    if (this.props.userUID === null) {
      this.props.toggleLoginModal();
    } else {
      if (this.props.memType === 'text') {
        this.props.createMemory('text');
      }
    }
  }

  render() {
    return (
      <Button
        className='create-memory-button'
        onClick={() => this.handleClick()}
        >
        Add { this.props.memType }
      </Button>
    );
  }
}
// const mapStateToProps = (state) => ({
//   // showLoginModal : state.getIn(['auth', 'showLoginModal'])
// });
// const mapDispatchToProps = (dispatch) => ({
//   // login: bindActionCreators(login, dispatch),
//   // toggleLoginModal: bindActionCreators(toggleLoginModal, dispatch)
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CreateMemoryButton);
