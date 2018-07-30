import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View } from './styles';

const CardContainer = (props) => {
  const { children } = props;

  return (
    <View {...props}>{children}</View>
  );
};

CardContainer.propTypes = {
  children: PT.node.isRequired,
};

export default CardContainer;