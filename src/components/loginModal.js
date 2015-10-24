import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, toggleLoginModal } from '../actions/authActions.js';

class ModalExample extends React.Component {
    static propTypes = {
      login: React.PropTypes.func,
      toggleLoginModal: React.PropTypes.func,
      showLoginModal: React.PropTypes.bool
    }
    open() {
      this.props.toggleLoginModal();
    }
    close() {
      this.props.toggleLoginModal();
    }
    oAuthLoginButton (input) {
      if (input) {
        this.props.login(input);
      }
    }

  render() {
    return (
      <div>
    <Button bsStyle="primary" bsSize="medium" onClick={() => this.open()}>Open Modal</Button>
      <Modal show={this.props.showLoginModal} onHide={() => true }>
             <Modal.Header closeButton>
               <Modal.Title>Please Login</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <h4>Login with one of the providers below:</h4>
                <div className="row">
                  <div className="col-md-12 text-center">
                  <div onClick={() => this.oAuthLoginButton('facebook')}>
                    <a className="btn btn-block btn-social btn-facebook">
                      <i className="fa fa-facebook"></i> Sign in with Facebook
                    </a>
                  </div>
                  <div onClick={() => this.oAuthLoginButton('twitter')}>
                    <a className="btn btn-block btn-social btn-twitter">
                      <i className="fa fa-twitter"></i> Sign in with Twitter
                    </a>
                  </div>
                  <div onClick={() => this.oAuthLoginButton('google')}>
                    <a className="btn btn-block btn-social btn-google">
                     <i className="fa fa-google"></i> Sign in with Google
                    </a>
                  </div>
                  </div>
                </div>


             </Modal.Body>
             <Modal.Footer>
               <Button onClick={() => this.close()}>Close</Button>
             </Modal.Footer>
           </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showLoginModal : state.auth.get('showLoginModal')
});
const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(login, dispatch),
  toggleLoginModal: bindActionCreators(toggleLoginModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);
