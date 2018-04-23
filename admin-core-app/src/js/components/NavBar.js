import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'react-bootstrap';
import PropTypes from 'prop-types';

class NavBar extends Component {

  constructor(props){
    super(props);

    this.state = {
    }

    this.onHomeClick = this.onHomeClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
    this.onSignOutClick = this.onSignOutClick.bind(this);
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

  onSignOutClick(){
    console.log('Sign out clicked');
  }

  render() {

    const { isAdmin, isManager, isSuper } = this.props;

    return (
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
            <NavItem eventKey={2}  onClick={this.onProfileClick}>
              Profile
            </NavItem>            
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1}  onClick={this.onSettingsClick}
                style={{visibility: isAdmin || isManager || isSuper ? 'visible' : 'hidden' }}>
              Settings
            </NavItem>
            <NavItem eventKey={2} onClick={this.onSignOutClick}>
              Sign Out
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isManager: PropTypes.bool.isRequired,
    isSuper: PropTypes.bool.isRequired
}

export default NavBar;
