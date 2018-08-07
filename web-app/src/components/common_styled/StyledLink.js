import styled from 'styled-components';

export default styled.a`
  color: ${props => props.theme.colours.unoBlue};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  :active {
    color: ${props => props.theme.colours.darkBlue};
  }
`;
