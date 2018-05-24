import React from 'react';
import Header from './components/Header';
import withAuth from './hoc/withAuth';
import { Dashboard } from './pages';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header user={this.props.user} history={this.props.history} />
        <Dashboard user={this.props.user} />
      </div>
    );
  }
}

export default withAuth(App);
