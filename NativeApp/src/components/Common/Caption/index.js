import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { ErrorText } from './styles';

const Caption = (props) => {
  const { children } = props;

  return (
    <ErrorText {...props}>{children}</ErrorText>
  );
};

Caption.propTypes = {
  children: PT.string.isRequired,
};

export default Caption;
