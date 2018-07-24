import styled, { css } from 'styled-components';

export const Text = styled.Text`
  fontSize: 26;
  fontWeight: bold;
  color: ${props => props.theme.colours.darkGrey};

  ${props => props.largeText && css`
  fontSize: 30;
  `}

  ${props => props.smallText && css`
  fontSize: 20px;
  `}
`;
