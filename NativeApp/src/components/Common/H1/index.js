import React from 'react';
import { Text } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';

const H1 = (props) => {
  const { children, type, style } = props;

  return (
    <Text {...props} style={[styles[type], style]}>{children}</Text>
  );
};

H1.propTypes = {
  children: PT.node.isRequired,
  type: PT.string.isRequired,
  style: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default H1;
