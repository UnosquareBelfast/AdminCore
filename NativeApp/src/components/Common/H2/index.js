import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const H2 = (props) => {
  const { children, style, type } = props;

  return (
    <Text {...props} style={[styles[type], style]}>{children}</Text>
  );
};

H2.defaultProps = {
  type: 'base',
};

H2.propTypes = {
  children: PT.node.isRequired,
  type: PT.string.isRequired,
  style: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default H2;
