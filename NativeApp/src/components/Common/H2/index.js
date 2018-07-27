import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Text } from './styles';

const H2 = (props) => {
  const { children } = props;

  return (
    <Text {...props}>{children}</Text>
  );
};

H2.propTypes = {
  children: PT.string.isRequired,
};

export default H2;
