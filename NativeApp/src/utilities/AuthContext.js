import React, { Component } from 'react';
import { Font } from 'expo';
import { PropTypes as PT } from 'prop-types';
import fontTypes from '../assets/fonts';
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
    const [session, font] = await Promise.all([this.appSession(), this.getFont()]);
    this.setState({
      isLoading: session.isLoading,
      token: session.token,
      fontLoaded: font.fontLoaded,
    });
  }

  getFont = async () => {
    await Font.loadAsync(fontTypes);
    return {
      fontLoaded: true,
    };
  }

  appSession = async () => {
    const session = await deviceStorage.getItem('id_token');

    return {
      token: session,
      isLoading: false,
    };
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
