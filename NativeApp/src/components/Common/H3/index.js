import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const H3 = (props) => {
  const { children, customStyle, type } = props;

  return (
    <Text {...props} style={[styles[type], customStyle]}>{children}</Text>
  );
};

H3.propTypes = {
  children: PT.node.isRequired,
  type: PT.string.isRequired,
  customStyle: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default H3;
