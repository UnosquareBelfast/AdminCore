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

  p {
    margin: 0;
  }

  h2 {
    margin-bottom: 5px;
  }

  > div {
    margin-bottom: 20px;
  }
`;

export const Stat = styled.div`
  flex: 1;
  h2 {
    color: ${props => props.theme.colours.unoBlue};
  }
  h4 {
    margin: 0;
  }
`;

export const StatWrap = styled.div`
  display: flex;

  > div {
    margin-right: 10px;
    :last-of-type {
      margin-right: 0;
    }
  }
`;
