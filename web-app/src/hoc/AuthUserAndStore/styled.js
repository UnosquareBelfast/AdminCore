import styled from 'styled-components';

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 50vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorContainer = styled.div`
  margin: 0;
  padding: 0;

  * {
    padding: 0 0 10px 0;
    margin: 0;
  }

  > p:last-of-type {
    background-color: ${props => props.theme.colours.darkRed};
    font-weight: 600;
    color: white;
    padding: 15px;
    border-radius: 3px;
  }
`;
