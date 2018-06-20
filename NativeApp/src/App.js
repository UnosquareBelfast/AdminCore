import React, { Component } from 'react';
import RootNavigator from './utilities/navigationConfig';
import { AuthProvider } from './utilities/AuthContext';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    );
  }
}

export default App;
