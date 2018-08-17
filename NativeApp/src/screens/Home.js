import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Home from '../components/Home';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Calendar',
  }

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;

    return <Home navigation={navigation} />;
  }
}
