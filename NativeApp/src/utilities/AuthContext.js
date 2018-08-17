import React, { Component } from 'react';
import { Font } from 'expo';
import { PropTypes as PT } from 'prop-types';
import deviceStorage from '../services/deviceStorage';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  static propTypes = {
    children: PT.element.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
    this.appSession();
  }

  appSession = async () => {
    await deviceStorage.getItem('id_token')
      .then(token => this.setState({ isLoading: false, token }));
  }

  render() {
    const { isLoading, token, fontLoaded } = this.state;
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{ isLoading, token, fontLoaded }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
