import React from 'react';
import Header from './Header/Header';
import withAuth from './Shared/withAuth';
import Dashboard from './Dashboard/Dashboard';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header user={this.props.user} history={this.props.history}/>
        <Dashboard />
      </div>
    );
  }
}

export default withAuth(App);