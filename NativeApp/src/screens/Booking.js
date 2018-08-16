import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Icon } from 'react-native-elements';
import Booking from '../components/Booking';

export default class BookingScreen extends Component {
  static navigationOptions = {
    title: 'Booking',
    headerBackTitle: null,
    headerBackImage: () => <Icon type="font-awesome" name="arrow-left" size={20} color="grey" />,
  }

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;

    return <Booking navigation={navigation} />;
  }
}