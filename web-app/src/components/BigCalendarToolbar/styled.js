import styled from 'styled-components';

export const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 15px 0;
  @media (min-width: ${props => props.theme.mediaQueries.md}) {
    flex-direction: row;
    justify-content: space-between;
  }

  h2 {
    margin: 0 0 0px 0;
  }
  p {
    margin: 8px 0 0 0;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colours.darkGrey};
  }

  button {
    cursor: pointer;
    outline: none;
    height: 40px;
    padding: 10px;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.colours.lightgrey};
    border: 1px solid ${({ theme }) => theme.colours.grey};
    color: ${({ theme }) => theme.colours.darkGrey};
    border-right: 0;
    :first-of-type {
      border-radius: 4px 0 0 4px;
    }
    :last-of-type {
      border-radius: 0 4px 4px 0;
      border-right: 1px solid ${({ theme }) => theme.colours.grey};
    }
    :hover {
      background-color: ${({ theme }) => theme.colours.unoBlue};
      border-color: ${({ theme }) => theme.colours.unoBlue};
      color: white;
    }
    :active {
      background-color: ${({ theme }) => theme.colours.darkBlue};
      border-color: ${({ theme }) => theme.colours.darkBlue};
    }
  }
`;
