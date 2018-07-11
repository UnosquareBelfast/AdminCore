import styled from 'styled-components';

export const ButtonWrap = styled.div`
  display: flex;
  margin: 20px 0 0 0;
  button {
    flex: 1;
    margin: 0;
  }
  button:first-of-type {
    margin-right: 2.5px;
  }
  button:last-of-type {
    margin-left: 2.5px;
  }
`;

export const ButtonContainer = styled.div`
  margin: 20px 0px 0 0;
`;
