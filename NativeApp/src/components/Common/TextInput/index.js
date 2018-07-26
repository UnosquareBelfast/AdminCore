import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { TextInp } from './styles';

const TextInput = (props) => {
  const { children } = props;

  return (
    <TextInp {...props}>{children}</TextInp>
  );
};

TextInput.propTypes = {
  children: PT.string.isRequired,
};

export default TextInput;
