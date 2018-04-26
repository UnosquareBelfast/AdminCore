import React, { Component } from 'react';
import 'react-bootstrap';

class LoginPage extends Component {

  constructor(props){
    super(props);

    this.state = {
    }

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(event){
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    if(email && password){
      this.signInUser(email, password);
    }
  }

  signInUser(email, password){
    this.props.attemptLogin(email, password);

    this.emailInput.value = '';
    this.passwordInput.value = '';
  }

  render() {

    return (
        <div>
            <form onSubmit={this.onSignIn}>
                <h3>Sign in to AdminCore</h3>
                <input placeholder="Email" type="email" ref={emailInput => this.emailInput = emailInput}/>
                <br/>
                <input placeholder="Password" type="password" ref={passwordInput => this.passwordInput = passwordInput}/>
                <br/>
                <button className="btn btn-primary">Sign In</button>
                <br/>
            </form>
            <br/>
        </div>
    );
  }
}

export default LoginPage;
