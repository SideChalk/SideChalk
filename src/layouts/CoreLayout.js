import React, { PropTypes } from 'react';

import { Navbar, CollapsibleNav, Nav, NavBrand, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import LoginModal from 'components/loginModal.js';
import { toggleLoginModal, logout } from 'actions/authActions.js';

import 'styles/core.scss';


export class CoreLayout extends React.Component {
  static propTypes = {
    children : PropTypes.element,
    loggedIn: PropTypes.bool,
    toggleLoginModal: PropTypes.func,
    logout: PropTypes.func
  }

  handleSelect(selectedKey) {
    console.log(selectedKey);
  }

  renderNavbar() {
    return (
      <Navbar toggleNavKey={0} >
        <NavBrand>SideChalk</NavBrand>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <LinkContainer to="/"><NavItem>List</NavItem></LinkContainer>
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
  render () {
    return (
      <div className='page-container'>
        {this.renderNavbar()}
        <div className='view-container'>
          {this.props.children}
        </div>
        <LoginModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn : !!state.getIn(['auth', 'uid'])
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoginModal : bindActionCreators(toggleLoginModal, dispatch),
  logout : bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
