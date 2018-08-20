import styled from 'styled-components';

export default styled.select`
  outline: none;
  border: 2px solid ${props => props.theme.colours.grey};
  background-color: ${props => props.theme.colours.white};
  font: inherit;
  padding: 4px 10px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  height: 42px;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.colours.unoBlue};
    background-color: ${props => props.theme.colours.lightBlue};
  }
`;
