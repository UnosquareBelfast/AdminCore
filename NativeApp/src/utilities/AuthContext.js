import React, { Component } from 'react';
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
    };
    this.appSession();
  }

  appSession = async () => {
    await deviceStorage.getItem('id_token')
      .then(token => this.setState({ isLoading: false, token }));
  }

  render() {
    const { isLoading, token } = this.state;
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{ isLoading, token }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
