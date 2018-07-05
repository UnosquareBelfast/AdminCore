import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../components/Home';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: <Icon name="home" size={25} color="#fff" />,
    tabBarColor: '#14967C',
  }

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;

    return (
      <Home navigation={navigation} />
    );
  }
}
