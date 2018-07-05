import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  FormGroup,
  Label,
  TextBox,
  TextBoxLarge,
  DropdownContainer,
  Dropdown,
  DatePickerContainer,
} from './styled';
import DatePicker from 'react-datepicker';

const Input = props => {
  let inputElement = null;
  let inputClasses = [];
  const {
    label,
    invalid,
    shouldValidate,
    touched,
    elementType,
    elementConfig,
    value,
    changed,
    focus,
  } = props;
  let formGroupId = label;
  let id = formGroupId.replace(' ', '').toLowerCase();

  if (invalid && shouldValidate && touched) {
    inputClasses.push('invalid');
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <TextBox
          className={inputClasses.join(' ')}
          id={id}
          {...elementConfig}
          value={value}
          onChange={changed}
          autoFocus={focus}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <TextBoxLarge
          rows={6}
          className={'large' + inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          id={id}
          onChange={changed}
          autoFocus={focus}
        />
      );
      break;
    case 'checkbox':
      inputElement = (
        <TextBox
          className={inputClasses.join(' ')}
          {...elementConfig}
          checked={value}
          id={id}
          onChange={changed}
          autoFocus={focus}
        />
      );
      break;
    case 'select':
      inputElement = (
        <DropdownContainer className={inputClasses.join(' ')}>
          <Dropdown
            className={inputClasses.join(' ')}
            value={value}
            id={id}
            onChange={changed}
          >
            {elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </Dropdown>
        </DropdownContainer>
      );
      break;
    case 'date':
      inputElement = (
        <DatePickerContainer className={inputClasses.join(' ')}>
          <DatePicker selected={value} onChange={changed} />
        </DatePickerContainer>
      );
      break;
    default:
      inputElement = (
        <TextBox
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          id={id}
          onChange={changed}
          autoFocus={focus}
        />
      );
  }

  return (
    <FormGroup className={elementType == 'checkbox' ? 'checkbox' : null}>
      <Label htmlFor={id}>{label}</Label>
      {inputElement}
    </FormGroup>
  );
};

Input.propTypes = {
  elementConfig: PT.object.isRequired,
  elementType: PT.string.isRequired,
  value: PT.any.isRequired,
  label: PT.string.isRequired,
  changed: PT.func.isRequired,
  invalid: PT.bool.isRequired,
  shouldValidate: PT.object.isRequired,
  touched: PT.bool,
  focus: PT.bool,
};

Input.defaultProps = {
  touched: false,
  focus: false,
};

export default Input;
