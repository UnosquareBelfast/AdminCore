import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Icon } from 'react-native-elements';
import Booking from '../components/Booking';
import { WHITE } from '../styles/colors';
import { H2_SIZE } from '../styles/text';

export default class BookingScreen extends Component {
  static navigationOptions = {
    title: 'Booking',
    headerBackTitle: null,
    headerTitleStyle: {
      color: WHITE,
      marginHorizontal: 0,
      fontSize: H2_SIZE,
      fontFamily: 'oswaldRegular',
    },
    headerBackImage: () => (
      <Icon
        containerStyle={{ paddingLeft: 15 }}
        type="font-awesome"
        name="arrow-left"
        size={20}
        color="white"
      />),
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
