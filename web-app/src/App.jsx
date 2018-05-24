import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import withAuth from './hoc/withAuth';
import { Dashboard } from './pages';
import { theme } from './styled';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme} >
        <Fragment>
          <Header user={this.props.user} history={this.props.history}/>
          <Dashboard user={this.props.user}/>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default withAuth(App);
