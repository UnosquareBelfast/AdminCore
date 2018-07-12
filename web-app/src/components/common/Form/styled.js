import styled from 'styled-components';

export const ButtonContainer = styled.div`
  margin: 20px 0px 0 0;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    flex-direction: row;
  }

  button {
    margin: 0 0 10px 0;
    @media (min-width: 992px) {
      margin: 20px 4px;
    }
  }
`;
