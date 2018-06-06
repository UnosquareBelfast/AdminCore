import React, { Component } from 'react';
import Login from '../components/Login';

export default class LoginScreen extends Component {

  render() {
    return (
      <Login navigation={this.props.navigation} />
    );
  }
}