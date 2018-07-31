import styled, { css } from 'styled-components';
import colours from '../../../utilities/globalStyles/theme';

export const HeaderContainer = styled.View`
  flex: 1;
  flexDirection: row;
  backgroundColor: ${colours.lightGrey};
  paddingTop: 8;
  paddingBottom: 8;
  maxHeight: 93;
  justifyContent: space-between;
  borderColor: ${colours.grey};
  borderBottomWidth: 1;
  alignSelf: center;
  alignItems: center;
`;

export const HolidayContainer = styled.View`
  alignItems: center;
  flex: 1;

  ${props => props.divider && css`
  borderColor: ${colours.grey};
  borderRightWidth: 3;
  `}
`;

export const HolidayText = styled.View`
  flex: 1;
  flexDirection: row;
  alignItems: baseline;
`;