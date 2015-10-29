import React, { PropTypes } from 'react';

import { Navbar, CollapsibleNav, Nav, NavBrand, NavItem, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import LoginModal from 'components/loginModal.js';
import { toggleLoginModal, logout } from 'actions/authActions.js';

import MemoryModal from 'components/MemoryModal';
import { showMemoryDetails, dismissMemoryDetails } from 'actions/memoryModalActions.js';

import 'styles/core.scss';


export class CoreLayout extends React.Component {
  static propTypes = {
    children : PropTypes.element,

    loggedIn: PropTypes.bool,
    toggleLoginModal: PropTypes.func,
    logout: PropTypes.func,

    locationError: PropTypes.string,

    memoryModalState: PropTypes.object,
    showMemoryDetails: PropTypes.func,
    dismissMemoryDetails: PropTypes.func
  }

  renderNavbar() {
    return (
      <Navbar toggleNavKey={0} >
        <NavBrand>SideChalk</NavBrand>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <LinkContainer to="/list"><NavItem>List</NavItem></LinkContainer>
            <LinkContainer to="/map"><NavItem>Map</NavItem></LinkContainer>
          </Nav>
          <Nav navbar right inverse>
            {this.props.loggedIn ?
              <NavItem bsStyle="warning" onClick={this.props.logout}>Logout</NavItem> :
              <NavItem bsStyle="warning" onClick={this.props.toggleLoginModal}>Login</NavItem>
            }
          </Nav>
        </CollapsibleNav>
      </Navbar>
    );
  }

  renderError() {
    if (this.props.locationError) {
      return (
        <Alert className="text-center" bsStyle="warning">
          <h4>{"Wheres's the chalk at?!"}</h4>
          <p>{this.props.locationError}</p>
        </Alert>
      );
    }
  }

  renderMemoryModal() {
    const { memoryModalState } = this.props;
    const memoryModalActions = {
      showMemoryDetails: this.props.showMemoryDetails,
      dismissMemoryDetails: this.props.dismissMemoryDetails
    };
    if (memoryModalState.get('showMemoryModal')) {
      return (
        <MemoryModal
          memoryModalState={memoryModalState.toJS()}
          memoryModalActions={memoryModalActions} />
      );
    }
  }

  render () {
    return (
      <div className='page-container'>
        {this.renderNavbar()}
        {this.renderError()}
        <div className='view-container'>
          {this.props.children}
          {this.renderMemoryModal()}
        </div>
        <LoginModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.getIn(['auth', 'uid']),
  locationError: state.get('locationError'),

  memoryModalState : state.get('memoryModals')
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoginModal : bindActionCreators(toggleLoginModal, dispatch),
  logout : bindActionCreators(logout, dispatch),

  showMemoryDetails : bindActionCreators(showMemoryDetails, dispatch),
  dismissMemoryDetails : bindActionCreators(dismissMemoryDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
