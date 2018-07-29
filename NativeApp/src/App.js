import React from 'react';
import RootNavigator from './utilities/navigationConfig';
import { AuthProvider } from './utilities/AuthContext';

const App = () => (
  <AuthProvider>
    <RootNavigator />
  </AuthProvider>
);

export default App;
