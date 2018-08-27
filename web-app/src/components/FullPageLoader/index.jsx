import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { isLoading } from '../../reducers';
import { InnerContainer } from './styled';
import { Spinner } from '../common';

class FullPageLoader extends Component {
  render() {
    const { loading } = this.props;
    return (
      loading && (
        <InnerContainer>
          <Spinner />
        </InnerContainer>
      )
    );
  }
}

FullPageLoader.propTypes = {
  loading: PT.bool.isRequired,
};

FullPageLoader.defaultProps = {
  loading: true,
};

const mapStateToProps = state => {
  return {
    loading: isLoading(state),
  };
};

export default connect(mapStateToProps)(FullPageLoader);
