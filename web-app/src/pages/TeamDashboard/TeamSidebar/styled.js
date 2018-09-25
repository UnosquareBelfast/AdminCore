import styled from 'styled-components';

export const ContainerStyle = styled.div`
  width: 200px;
  height: 100vh;
  padding: 20px 10px 10px 10px;
  background-color: ${props => props.theme.colours.lightgrey};

  .title {
    margin: 0;
  }

  .client {
    margin: 10px 0;
  }

  .team-link {
    margin: 0 0 5px 0;
    background-color: ${props => props.theme.colours.green};
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;

    :hover {
      opacity: 0.9;
    }

    :active {
      opacity: 0.8;
    }
  }
`;
