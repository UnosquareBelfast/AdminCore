import styled from 'styled-components';

export const ErrorContainer = styled.div`
  margin: 15px 0;
  padding: 10px;
  background: ${props => props.theme.colours.lightRed};
  width: 100%;
  box-sizing: border-box;
  color: ${props => props.theme.colours.white};
  opacity: 1;

  p {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
  p:first-of-type {
    margin-bottom: 3px;
  }
`;
