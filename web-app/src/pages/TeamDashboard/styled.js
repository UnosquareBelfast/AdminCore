import styled from 'styled-components';

export const Container = styled.div``;

export const Stat = styled.div`
  max-width: 200px;
  h1 {
    margin-bottom: 5px;
    color: ${props => props.theme.colours.unoBlue};
  }
`;

export const Columns = styled.div`
  display: flex;
  margin-bottom: 20px;
  > div {
    width: 50%;
    :first-of-type {
      margin-right: 10px;
    }
    :last-of-type {
      margin-left: 10px;
    }
  }
`;
