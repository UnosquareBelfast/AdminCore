import React, { Component } from 'react';
import {PropTypes as PT} from 'prop-types';
import Home from '../components/Home';

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PT.object,
  }

  static navigationOptions = {
    title: 'Home'
  }

  render() {
    return (
      <Home navigation={this.props.navigation}/>
    );
  }
}
