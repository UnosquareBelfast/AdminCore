import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { userLogin } from '../../services/userService';


export default Container => class extends Component {
  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }),
  }

  static defaultProps = {
    navigation: {},
  }

  state = {
    hasError: false,
  }

  handleLogin = (email, password) => {
    const { navigation } = this.props;
    userLogin(email, password)
      .then(() => {
        navigation.navigate('App');
      })
      .catch((e) => {
        Alert.alert(
          'Could not login',
          e.message,
        );
        this.setState({
          hasError: true,
        });
      });
  }

  render() {
    const {
      hasError,
    } = this.state;

    return (
      <Container
        hasError={hasError}
        handleLogin={this.handleLogin}
      />
    );
  }
};
