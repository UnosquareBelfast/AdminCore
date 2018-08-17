import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const H4 = (props) => {
  const { children, style, type } = props;

  return (
    <Text {...props} style={[styles[type], style]}>{children}</Text>
  );
};

H4.defaultProps = {
  type: 'base',
};

H4.propTypes = {
  children: PT.node.isRequired,
  type: PT.string,
  style: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default H4;
