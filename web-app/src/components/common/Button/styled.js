import styled from 'styled-components';

export const Container = styled.button`
  background: ${props => props.theme.colours.unoBlue};
  color: white;
  cursor: pointer;
  text-align: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  border: none;
  font-weight: ${props => props.theme.fonts.weight.bold};
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`;
