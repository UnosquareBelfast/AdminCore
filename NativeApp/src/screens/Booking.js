import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Booking from '../components/Booking';

export default class BookingScreen extends Component {
  static navigationOptions = {
    title: 'Request Holidays',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
    },
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
