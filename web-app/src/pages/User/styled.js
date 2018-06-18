import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  .card {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  h1{
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