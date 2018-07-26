import styled, { css } from 'styled-components';

export const View = styled.View`
  paddingTop: 20;

  ${props => props.card && css`
    borderWidth: 1;
    borderColor: #fff;
    marginHorizontal: 20;
    paddingLeft: 20;
    paddingRight: 20;
    backgroundColor: #fff;
    borderRadius: 15;
  `}
`;

export const Image = styled.Image`
  height: 100;
  width: 220;
  alignSelf: center;
`;

export const ScrollView = styled.ScrollView`
  paddingTop: 100;
  flex: 1;
  backgroundColor: #fff;
  flexDirection: column;
`;
