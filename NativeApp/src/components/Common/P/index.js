import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Text } from './styles';

const P = (props) => {
  const { children } = props;

  return (
    <Text {...props}>{children}</Text>
  );
};

P.propTypes = {
  children: PT.string.isRequired,
};

export default P;
