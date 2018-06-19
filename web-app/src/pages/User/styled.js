import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  .card {
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  }

  .return {
    display: inline-block;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  .return:hover {
    color: ${props => props.theme.colours.unoBlue};
    border-bottom-color: ${props => props.theme.colours.unoBlue};
  }

  h1{
    margin-top: 1rem;
    margin-bottom: 5px;
  }
  h2 {
    margin: 0;
  }
  p {
    margin-top: 0;
    margin-bottom: 3px;
  }
  svg{
    margin-right: 5px;
  }
`;

export const Splitter = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colours.grey}
  margin: 1rem 0;
`;