import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Text } from './styles';

const H1 = (props) => {
  const { children } = props;

  return (
    <Text {...props}>{children}</Text>
  );
};

H1.propTypes = {
  children: PT.string.isRequired,
};

export default H1;
