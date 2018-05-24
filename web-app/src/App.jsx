import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard, Login } from './pages';
import { ThemeProvider } from 'styled-components';
import { theme } from './styled';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme} >
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
