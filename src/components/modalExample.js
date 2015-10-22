import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, openLoginModal } from 'actions/actions.js';


 class ModalExample extends React.Component {
    static propTypes = {
      loggingIn: React.PropTypes.bool,
      login: React.PropTypes.func,
      openLoginModal: React.PropTypes.func
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
      this.props.openLoginModal();
    }
    close(){
      this.props.closeLoginModal();
    }
  render() {

    return (
      <div>
      <Button bsStyle="primary" bsSize="medium" onClick={() => this.open()}>Open Modal</Button>
      <Modal show={this.props.loggingIn} onHide={() => true }>
             <Modal.Header closeButton>
               <Modal.Title>Please Login</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <h4>Login with one of the providers below:</h4>
                <div className="row">
                  <div className="col-md-12 text-center">
                    
                  <div>
                    <img alt="Bootstrap Image Preview" src="https://placeholdit.imgix.net/~text?txtsize=9&txt=FACEBOOK&w=205&h=35" />
                  </div>
                  <div>
                    <img alt="Bootstrap Image Preview" src="https://placeholdit.imgix.net/~text?txtsize=9&txt=TWITTER&w=205&h=35" />
                  </div>
                  <div>
                    <img alt="Bootstrap Image Preview" src="https://placeholdit.imgix.net/~text?txtsize=9&txt=FACEBOOK&w=205&h=35" />
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
  loggingIn : state.auth.get("loggingIn")
});
const mapDispatchToProps = (dispatch) => ({
  login : bindActionCreators(login, dispatch),
  openLoginModal: bindActionCreators(openLoginModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);