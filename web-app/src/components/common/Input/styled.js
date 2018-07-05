import styled from 'styled-components';

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;

  input,
  textarea,
  select {
    outline: none;
    border: 2px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 4px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    line-height: 30px;
    &:focus {
      outline: none;
      border: 2px solid #0eb5d1;
      background-color: #daffff;
    }
  }

  &.checkbox {
    position: relative;
    padding: 0 20px;
    margin-bottom: 10px;

    input[type='checkbox'] {
      position: absolute;
      left: 0px;
      top: 3px;
      width: auto;
    }
  }
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

export const TextBox = styled.input`
  &.invalid {
    border: 2px solid red !important;
    background-color: #fda49a !important;
  }
`;

export const TextBoxLarge = styled.textarea`
  &.invalid {
    border: 2px solid red !important;
    background-color: #fda49a !important;
  }
`;

export const Dropdown = styled.select`
  -webkit-appearance: none;
  outline: none;
  border: 2px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 4px 10px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  line-height: 30px;
  height: 42px;
  position: realative;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
    border: 2px solid #0eb5d1;
    background-color: #daffff;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  &:after {
    position: absolute;
    content: '';
    top: 16px;
    right: 8px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-color: #0eb5d1 transparent transparent transparent;
  }
`;

export const DatePickerContainer = styled.div`
  .react-datepicker-wrapper {
    display: block;
    width: 100%;
    .react-datepicker__input-container {
      display: block;
      width: 100%;
    }
  }
  &.invalid input {
    border: 2px solid red !important;
    background-color: #fda49a !important;
  }
`;
