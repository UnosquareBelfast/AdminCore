import styled from 'styled-components';

export const ContractStyle = styled.div`
  background-color: ${props => props.theme.colours.lightgrey};
  padding: 20px;
  margin-bottom: 20px;

  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-bottom: 5px;
    }
    span {
      font-weight: ${props => props.theme.fonts.weight.bold};
    }
  }
`;
