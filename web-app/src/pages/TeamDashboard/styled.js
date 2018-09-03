import styled from 'styled-components';

export const Container = styled.div``;

export const Stat = styled.div`
  max-width: 100%;
  flex: 1;
  margin-right: 15px;
  h1 {
    margin-bottom: 5px;
    color: ${props => props.theme.colours.unoBlue};
    }
`;

export const Columns = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  @media (min-width: ${props => props.theme.mediaQueries.lg}) {
    justify-content: space-around;
    flex-direction: row;
    }

  &:last-of-type > div {
    margin: 15px 0;
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      width: 50%;
      :first-of-type {
        margin: 0 10px 0 0;
      }
      :last-of-type {
        margin: 0 0 0 10px;
      }
    }
  }
`;
