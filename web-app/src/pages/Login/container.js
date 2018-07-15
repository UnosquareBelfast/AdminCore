import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { isLoggedIn } from '../../utilities/currentUser';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
    };
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      if (isLoggedIn()) this.props.history.replace('/');
    }

    render() {
      return <Wrapped history={this.props.history} />;
    }
  };
