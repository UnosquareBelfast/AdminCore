import styled, { css } from 'styled-components';

export const Text = styled.Text`
  color: #fff;
  fontSize: 20;
  fontWeight: bold;

  ${props => props.validationText && css`
    color: red;
    fontSize: 18;
    paddingHorizontal: 5;
    fontWeight: normal;
  `}
`;
