import styled from 'styled-components';

export const StyleContainer = styled.div`
  margin: 20px;
  @media (min-width: 920px) {
    margin: 40px;
  }
  #closeModal {
    position: absolute;
    cursor: pointer;
    top: 5px;
    font-weight: bold;
  }

  > p {
    margin: 0;
  }

  > h2 {
    margin-bottom: 5px;
  }
`;
