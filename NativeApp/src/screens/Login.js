import React, { Component } from 'react';
import {PropTypes as PT} from 'prop-types';
import Login from '../components/Login';

export default class LoginScreen extends Component {
  static propTypes = {
    navigation: PT.object,
  }

  render() {
    return (
      <Login navigation={this.props.navigation} />
    );
  }
}