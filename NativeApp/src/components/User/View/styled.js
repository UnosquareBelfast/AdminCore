import styled, { css } from 'styled-components';

export const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      flex: 1,
      paddingTop: 23,
      backgroundColor: '#fff',
    }
  }
})``

export const Text = styled.Text`
  fontSize: 26;
  fontWeight: bold;
  color: ${props => props.theme.colours.darkGrey};

  ${props => props.largeText && css`
  fontSize: 30;
  `}

  ${props => props.smallText && css`
  fontSize: 17;
  paddingBottom: 3;
  paddingLeft: 2;
  `}
`;

export const HeaderContainer = styled.View`
  flex: 1;
  flexDirection: row;
  backgroundColor: #E5E5E5;
  paddingTop: 8;
  paddingBottom: 8;
  maxHeight: 93;
  justifyContent: space-between;
  borderColor: #B1B1B1;
  borderBottomWidth: 1;
  alignSelf: center;
  alignItems: center;
`;


export const HolidayContainer = styled.View`
  alignItems: center;
  flex: 1;

  ${props => props.divider && css`
  borderColor: ${props => props.theme.colours.grey};
  borderRightWidth: 3;
  `}
`;

export const HolidayText = styled.View`
  flex: 1;
  flexDirection: row;
  alignItems: baseline;
`;