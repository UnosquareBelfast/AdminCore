import React from 'react';
import { ThemeProvider } from 'styled-components';
import RootNavigator from './utilities/navigationConfig';
import { AuthProvider } from './utilities/AuthContext';
import { theme } from './utilities/globalStyles/theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
