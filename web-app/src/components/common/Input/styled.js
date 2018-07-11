import styled from 'styled-components';

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

export const TextBox = styled.input`
  &.invalid {
    border: 2px solid ${props => props.theme.colours.darkRed} !important;
    background-color: ${props => props.theme.colours.lightRed} !important;
  }
`;

export const TextBoxLarge = styled.textarea`
  &.invalid {
    border: 2px solid ${props => props.theme.colours.darkRed} !important;
    background-color: ${props => props.theme.colours.lightRed} !important;
  }
`;

export const Dropdown = styled.select`
  -webkit-appearance: none;
  outline: none;
  border: 2px solid ${props => props.theme.colours.grey};
  background-color: ${props => props.theme.colours.white};
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
    border: 2px solid ${props => props.theme.colours.unoBlue};
    background-color: ${props => props.theme.colours.lightBlue};
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
    border-color: ${props => props.theme.colours.unoBlue} transparent
      transparent transparent;
  }
`;

export const DatePickerContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 1;
    font-size: 20px;
    color: ${props => props.theme.colours.unoBlue};
  }

  .react-datepicker-wrapper {
    display: block;
    width: 100%;
    .react-datepicker__input-container {
      display: block;
      width: 100%;
    }
  }

  &.invalid {
    svg {
      color: ${props => props.theme.colours.darkRed};
    }

    input {
      border: 2px solid ${props => props.theme.colours.darkRed} !important;
      background-color: ${props => props.theme.colours.lightRed} !important;
    }
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;

  input,
  textarea,
  select {
    outline: none;
    border: 2px solid ${props => props.theme.colours.grey};
    background-color: ${props => props.theme.colours.white};
    font: inherit;
    padding: 4px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    line-height: 30px;
    &:focus {
      outline: none;
      border: 2px solid ${props => props.theme.colours.unoBlue};
      background-color: ${props => props.theme.colours.lightBlue};
    }
  }

  &.isDisabled {
    visibility: hidden !important;
    input {
      cursor: none;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  &.checkbox {
    position: relative;
    padding: 0;
    margin-bottom: 15px;
    height: 16px;

    &:before {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      width: 12px;
      height: 12px;
      box-shadow: 0px 0px 0px 2px ${props => props.theme.colours.unoBlue};
      background-color: ${props => props.theme.colours.white}
      border: 2px solid ${props => props.theme.colours.white}
      box-sizing: border-box;
    }

    &.ischecked {
      &:before{
        background-color: ${props => props.theme.colours.unoBlue};
      }
    }

    ${Label} {
      padding-left: 26px;
      position: absolute;
    }

    input[type='checkbox'] {
      display: none;
    }

  }
`;
