import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { ButtonToggle } from './styled';

const ToggleButton = props => {
  const { leftButton, rightButton, onToggleButton, activeButtonText } = props;
  const buttons = [leftButton, rightButton];
  return (
    <ButtonToggle>
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            onClick={onToggleButton}
            className={activeButtonText === button.text ? 'active' : ''}
          >
            <span>{button.icon}</span>
            <span>{button.text}</span>
          </button>
        );
      })}
    </ButtonToggle>
  );
};

ToggleButton.propTypes = {
  leftButton: PT.object.isRequired,
  rightButton: PT.object.isRequired,
  onToggleButton: PT.func.isRequired,
  activeButtonText: PT.string.isRequired,
};

export default ToggleButton;
