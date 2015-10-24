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
    // constructor() {
    //     super();
    //     //this.open = this.open.bind(this);
    //     //this.close = this.close.bind(this);
        

    //     //this.render = this.render.bind(this);
    //     this.state = {
    //       showModal: false,
    //       buttonLabel: "Show The Modal"
    //     };
    // }

    // close() {
    //   this.setState({ showModal: false });
    // }

    open() {
      this.props.toggleLoginModal();
    }
    close(){
      console.log("wackah")
      this.props.toggleLoginModal();
    }
    oAuthLoginButton(input){
      if (input){
        console.log("LOGIN WITH", input);
        //send that action somehow      
      }

      //send that action somehow
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
                    
                  <div onClick={() => this.oAuthLoginButton("facebook")}>
                    <img alt="Bootstrap Image Preview" src="https://placeholdit.imgix.net/~text?txtsize=9&txt=FACEBOOK&w=205&h=35" />
                  </div>
                  <div onClick={() => this.oAuthLoginButton("twitter")}>
                    <img alt="Bootstrap Image Preview" src="https://placeholdit.imgix.net/~text?txtsize=9&txt=TWITTER&w=205&h=35" />
                  </div>
                  <div onClick={() => this.oAuthLoginButton("google")}>
                    <img alt="Bootstrap Image Preview" src="https://placeholdit.imgix.net/~text?txtsize=9&txt=GOOGLe&w=205&h=35" />
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
  showLoginModal : state.auth.get("showLoginModal")
});
const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(login, dispatch),
  toggleLoginModal: bindActionCreators(toggleLoginModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);