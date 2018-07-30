import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userLogout } from '../utilities/currentUser';

export default class LogoutScreen extends Component {
  static navigationOptions = {
    header: null,
    title: 'Logout',
    tabBarIcon: ({ tintColor }) => <Icon name="sign-out" size={25} color={tintColor} />,
  };

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.sub = navigation.addListener('didFocus', () => {
      Alert.alert(
        'Logout?',
        'Are you sure you want to logout?',
        [
          { text: 'Yes', onPress: () => this.handleLogout() },
          { text: 'No', onPress: () => navigation.goBack() },
        ],
        { cancelable: false },
      );
    });
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  handleLogout = () => {
    const { navigation } = this.props;
    userLogout()
      .then(navigation.navigate('Auth'));
  }

  render() {
    return <View />;
  }
}
