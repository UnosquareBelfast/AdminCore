import styled, { css } from 'styled-components';

export const Text = styled.Text`
  fontSize: 17;
  color: black;

  ${props => props.dayText && css`
    paddingBottom: 5;
    color: ${props => props.theme.colours.darkGrey};
    paddingLeft: 2;
  `}
`;