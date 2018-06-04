import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';

const Button = props => {
  return <Container {...props}>{props.label}</Container>;
};

Button.propTypes = {
  label: PT.string.isRequired,
  onClick: PT.func.isRequired,
};

export default Button;
