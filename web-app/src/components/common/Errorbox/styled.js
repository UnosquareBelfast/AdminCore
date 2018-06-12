import styled from 'styled-components';

export const ErrorContainer = styled.div`
  margin: 1rem 0;
  padding: 0.5rem;
  background: #ff1a1a;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  color: white;

  p {
    padding: 0;
    margin: 0;
  }
  p:first-of-type {
    margin-bottom: 0.3rem;
  }
`;
