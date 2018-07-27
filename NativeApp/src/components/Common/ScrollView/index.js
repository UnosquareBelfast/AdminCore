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
  children: PT.oneOfType([
    PT.element,
    PT.array,
  ]).isRequired,
};

export default ScrollView;
