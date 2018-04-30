import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginService from '../Login/LoginService';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

        this.Auth = new LoginService();
    }

// TODO: Get email from JWT.

    handleLogout(){
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    render() {
        return (
            <div className="App">
            <div className="App-header">
                <h2>Welcome {this.props.user.email}</h2>
            </div>
            <p className="App-intro">
                <button type="button" className="form-submit" onClick={this.handleLogout}>Logout</button>
            </p>
            </div>
        );  
    }
}

export default Header;