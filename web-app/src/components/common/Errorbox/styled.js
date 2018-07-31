import styled from 'styled-components';

export const ErrorContainer = styled.div`
  margin: 0;
  padding: 10px;
  background: ${props => props.theme.colours.lightRed};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  color: ${props => props.theme.colours.red};
  opacity: 1;
  box-shadow: 0px 0px 14px ${props => props.theme.colours.lightRed};
  border: 5px solid white;
  border-radius: 6px;

  p {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
  p:first-of-type {
    margin-bottom: 3px;
  }
`;
