import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';

const Button = ({label, onClick}) => (
  <Container onClick={onClick}>{label}</Container>
);

Button.propTypes = {
  label: PT.string.isRequired,
  onClick: PT.func.isRequired,
};

export default Button;
