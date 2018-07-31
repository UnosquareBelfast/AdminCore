import React from 'react';
import { Text } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';


const Caption = (props) => {
  const { children, customStyle, type } = props;

  return (
    <Text {...props} style={[styles[type], customStyle]}>{children}</Text>
  );
};

Caption.propTypes = {
  children: PT.node.isRequired,
  type: PT.string.isRequired,
  customStyle: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default Caption;
