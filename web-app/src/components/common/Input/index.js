import React from 'react';
import container from './container';
import { PropTypes as PT } from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
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
    valid,
    touched,
    type,
    htmlAttrs,
    value,
    changed,
    focus,
  } = props;
  let formGroupId = label;
  let id = formGroupId.replace(' ', '').toLowerCase();

  if (!valid && touched) {
    inputClasses.push('invalid');
  }

  if (htmlAttrs.disabled) {
    inputClasses.push('disabled');
  }

  switch (type) {
    case 'input':
      inputElement = (
        <TextBox
          className={inputClasses.join(' ')}
          id={id}
          {...htmlAttrs}
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
          {...htmlAttrs}
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
          {...htmlAttrs}
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
            {htmlAttrs.options.map(option => (
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
          <FontAwesomeIcon icon={faCalendarAlt} />
          <DatePicker selected={value} onChange={changed} />
        </DatePickerContainer>
      );
      break;
    default:
      inputElement = (
        <TextBox
          className={inputClasses.join(' ')}
          {...htmlAttrs}
          value={value}
          id={id}
          onChange={changed}
          autoFocus={focus}
        />
      );
  }

  const checkType = () => {
    let styles = [];
    styles.push(type);
    if (type === 'checkbox') {
      if (value) {
        styles.push('ischecked');
      }
    }

    if (htmlAttrs.disabled) {
      styles.push('isDisabled');
    } else {
      var index = styles.indexOf('isDisabled');
      if (index !== -1) {
        styles.splice(index, 1);
      }
    }

    return styles.join(' ');
  };

  return (
    <FormGroup className={checkType()}>
      <Label htmlFor={id}>{label}</Label>
      {inputElement}
    </FormGroup>
  );
};

Input.propTypes = {
  htmlAttrs: PT.object.isRequired,
  type: PT.string.isRequired,
  value: PT.any,
  label: PT.string.isRequired,
  changed: PT.func.isRequired,
  valid: PT.bool.isRequired,
  touched: PT.bool,
  focus: PT.bool,
};

Input.defaultProps = {
  touched: false,
  focus: false,
};

export default container(Input);
