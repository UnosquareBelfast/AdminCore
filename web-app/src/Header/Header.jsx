import React from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'react-bootstrap';
import LoginService from '../Login/LoginService';
import styles from './Header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.onHomeClick = this.onHomeClick.bind(this);
        this.onSettingsClick = this.onSettingsClick.bind(this);

        this.Auth = new LoginService();
    }

// TODO: Get email from JWT.

    handleLogout(){
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    onHomeClick(){
        console.log("Home clicked");
      }
    
    onSettingsClick(){
        console.log('Settings clicked');
    }

    render() {
        return (
            <div className="App">

                <Navbar inverse collapseOnSelect className={styles.NavBarStyling}>
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
                                style={{visibility: this.props.user.employeeRoleId < 3 ? 'visible' : 'hidden' }}>
                            Settings
                            </NavItem>
                            <NavItem eventKey={2} onClick={this.handleLogout}>
                            Sign Out
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* <div className="App-header">
                    <h2>Welcome {this.props.user.email}</h2>
                </div>
                <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout}>Logout</button>
                </p> */}
            </div>
        );  
    }
}

export default Header;