import React from 'react';
import { PropTypes as PT } from 'prop-types';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
    };

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Wrapped 
          user={ this.props.user }
          {...this.props} />
      );
    }
  };
