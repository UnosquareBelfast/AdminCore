import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { ScrollContainer } from './styles';

const ScrollView = (props) => {
  const { children } = props;

  return (
    <ScrollContainer {...props}>{children}</ScrollContainer>
  );
};

ScrollView.propTypes = {
  children: PT.node.isRequired,
};

export default ScrollView;
