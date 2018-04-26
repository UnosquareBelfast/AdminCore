import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'react-bootstrap';
import PropTypes from 'prop-types';
import UserSignOutModal from '../userSignOut/UserSignOutModal';

class NavBar extends Component {

  constructor(props){
    super(props);

    this.state = {
      signOutModalOpen: false
    }

    this.onHomeClick = this.onHomeClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
    this.signUserOutDisposeJWT = this.signUserOutDisposeJWT.bind(this);
  }

  onHomeClick(){
    console.log("Home clicked");
  }

  onSettingsClick(){
    console.log('Settings clicked');
  }

  onProfileClick(){
    console.log('Profile clicked');  
  }

  signUserOutDisposeJWT(){
    console.log('signUserOutDisposeJWT');
    this.toggleUserSignOutModal();
    this.props.signUserOut();
  }

  toggleUserSignOutModal = () => {
    this.setState({
      signOutModalOpen: !this.state.signOutModalOpen
    });
}

  render() {

    const { isAdmin, isManager, isSuper } = this.props;

    return (
      <div>
        <Navbar inverse collapseOnSelect className='NavBarStyling'>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">AdminCore</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}  onClick={this.onHomeClick}>
              Home
            </NavItem>       
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1}  onClick={this.onSettingsClick}
                style={{visibility: isAdmin || isManager || isSuper ? 'visible' : 'hidden' }}>
              Settings
            </NavItem>
            <NavItem eventKey={2} onClick={this.toggleUserSignOutModal}>
              Sign Out
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <UserSignOutModal
        show={this.state.signOutModalOpen}
        onClose={this.toggleUserSignOutModal}
        onSignOut={this.signUserOutDisposeJWT}>
      </UserSignOutModal>
      </div>
    );
  }
}

NavBar.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isManager: PropTypes.bool.isRequired,
    isSuper: PropTypes.bool.isRequired,
    signUserOut: PropTypes.func.isRequired
}

export default NavBar;
