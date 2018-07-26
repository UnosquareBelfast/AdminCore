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

export const TextInput = styled.TextInput`
  height: 40;
  marginTop: 20;
  paddingHorizontal: 5;
  fontSize: 20;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  backgroundColor: ${props => props.theme.colours.unoBlue};
  height: 48;
  borderRadius: 5;
  alignItems: center;
  paddingTop: 8;
  paddingBottom: 8;
  marginTop: 30;
`;

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