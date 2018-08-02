import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';

const CardContainer = (props) => {
  const { children, style } = props;

  return (
    <View {...props} style={[styles.card, style]}>{children}</View>
  );
};

CardContainer.propTypes = {
  children: PT.node.isRequired,
  style: PT.oneOfType([
    PT.number,
    PT.object,
    PT.array,
  ]),
};

export default CardContainer;
