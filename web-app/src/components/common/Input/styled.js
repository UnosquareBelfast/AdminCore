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
`;

export const Label = styled.label`
  display: block;
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
  &:focus {
    outline: none;
    border: 2px solid #0eb5d1;
    background-color: #daffff;
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
`;
