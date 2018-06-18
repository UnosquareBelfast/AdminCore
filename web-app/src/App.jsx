import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard, Login, Admin, User } from './pages';
import { ThemeProvider } from 'styled-components';
import { theme } from './styled';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/user/:userId" component={User} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
