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
    loading: false
  }

  handleLogin = (email, password) => {
    const { navigation } = this.props;
    this.setState({ loading: true });
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
          loading: false,
        });
      });
  }

  render() {
    const {
      hasError,
      loading,
    } = this.state;

    return (
      <Container
        hasError={hasError}
        loading={loading}
        handleLogin={this.handleLogin}
      />
    );
  }
};
