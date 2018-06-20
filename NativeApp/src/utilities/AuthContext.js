import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import deviceStorage from '../services/deviceStorage';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  static propTypes = {
    children: PT.object,
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
      .then(token => this.setState({isLoading: false, token: token}));
  }

  render() {
    return (
      <AuthContext.Provider
        value={{ isLoading: this.state.isLoading, token: this.state.token }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
