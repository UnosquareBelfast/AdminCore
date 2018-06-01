import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { ErrorContainer } from './styled';

const Errorbox = props => {
  return props.error ? (
    <ErrorContainer>
      <p>
        <strong>{props.label ? props.label : 'Error'}</strong>
      </p>
      <p>{props.error.message}</p>
    </ErrorContainer>
  ) : null;
};

Errorbox.propTypes = {
  error: PT.object,
  label: PT.string,
};

export default Errorbox;
