import React from 'react';
import { Text } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';

const P = (props) => {
  const { children, type, styleProp } = props;

  return (
    <Text style={[styles[type], styleProp]} {...props}>{children}</Text>
  );
};

P.propTypes = {
  children: PT.node.isRequired,
  type: PT.string.isRequired,
  styleProp: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default P;
