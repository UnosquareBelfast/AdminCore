import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { ButtonStyle } from './styled';


export const ActionButton = ({holiday, action, label, color, hoverColor}) => (
  <ButtonStyle color={color} hoverColor={hoverColor}>
    <button
      onClick={() => action(holiday)}
    >
      {label}
    </button>
  </ButtonStyle>
);

ActionButton.propTypes = {
  holiday: PT.object,
  action: PT.func,
  label: PT.string,
  color: PT.string,
  hoverColor: PT.string,
};

export default ActionButton;