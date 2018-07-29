import React from 'react';
import { Text } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';

const H1 = (props) => {
  const { children, type, styleProp } = props;

  return (
    <Text style={[styles[type], styleProp]} {...props}>{children}</Text>
  );
};

H1.propTypes = {
  children: PT.oneOfType([
    PT.string,
    PT.number,
  ]).isRequired,
  type: PT.string.isRequired,
  styleProp: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default H1;
