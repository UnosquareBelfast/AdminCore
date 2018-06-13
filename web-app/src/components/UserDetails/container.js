import React from 'react';
import { PropTypes as PT } from 'prop-types';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    render() {
      return <Wrapped user={this.props.user} {...this.props} />;
    }
  };
