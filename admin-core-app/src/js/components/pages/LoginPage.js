import React, { Component } from 'react';
import 'react-bootstrap';
import PropTypes from 'prop-types';

class LoginPage extends Component {

  constructor(props){
    super(props);

    this.state = {
    }

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(event){
    event.preventDefault();

    this.props.onAdd(this.emailInput.value, this.passwordInput.value);

    this.nameInput.value = '';
    this.priceInput.value = '';
  }

  render() {

    return (
        <div>
            <form onSubmit={this.onSignIn}>
                <h3>Sign in to AdminCore</h3>
                <input placeholder="Email" ref={emailInput => this.emailInput = emailInput}/>
                <br/>
                <input placeholder="Password" ref={passwordInput => this.passwordInput = passwordInput}/>
                <br/>
                <button className="btn btn-primary">Sign In</button>
                <hr/>
            </form>
            <br/>
        </div>
    );
  }
}

export default LoginPage;
