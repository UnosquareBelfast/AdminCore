import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  FormGroup,
  Label,
  TextBox,
  TextBoxLarge,
  Dropdown,
  DatePickerContainer,
} from './styled';
import DatePicker from 'react-datepicker';

const Input = props => {
  let inputElement = null;
  let inputClasses = [];
  let formGroupId = props.label;
  let id = formGroupId.replace(' ', '').toLowerCase();

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('invalid');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <TextBox
          className={inputClasses.join(' ')}
          id={id}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          autoFocus={props.focus}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <TextBoxLarge
          rows={6}
          className={'large' + inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          id={id}
          onChange={props.changed}
          autoFocus={props.focus}
        />
      );
      break;
    case 'checkbox':
      inputElement = (
        <TextBox
          rows={6}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          checked={props.value}
          id={id}
          onChange={props.changed}
          autoFocus={props.focus}
        />
      );
      break;
    case 'select':
      inputElement = (
        <Dropdown
          className={inputClasses.join(' ')}
          value={props.value}
          id={id}
          onChange={props.changed}
          autoFocus={props.focus}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </Dropdown>
      );
      break;
    case 'date':
      inputElement = (
        <DatePickerContainer>
          <DatePicker selected={props.value} onChange={props.changed} />
        </DatePickerContainer>
      );
      break;
    default:
      inputElement = (
        <TextBox
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          id={id}
          onChange={props.changed}
          autoFocus={props.focus}
        />
      );
  }

  return (
    <FormGroup>
      <Label htmlFor={id}>{props.label}</Label>
      {inputElement}
    </FormGroup>
  );
};

Input.propTypes = {
  elementConfig: PT.object,
  elementType: PT.string,
  value: PT.any,
  label: PT.string,
  changed: PT.func,
  touched: PT.bool,
  invalid: PT.bool,
  focus: PT.bool,
  shouldValidate: PT.object,
};

export default Input;
