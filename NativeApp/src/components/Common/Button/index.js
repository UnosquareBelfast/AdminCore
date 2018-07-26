import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { TouchableOpacity } from './styles';

const Button = (props) => {
  const { children } = props;

  return (
    <TouchableOpacity {...props}>{children}</TouchableOpacity>
  );
};

Button.propTypes = {
  children: PT.string.isRequired,
};

export default Button;