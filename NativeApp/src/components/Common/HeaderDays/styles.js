import { StyleSheet } from 'react-native';
import {LIGHTGREY, GREY, DARKGREY } from '../../../styles/colors';

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: LIGHTGREY,
    paddingTop: 8,
    paddingBottom: 8,
    maxHeight: 93,
    justifyContent: 'space-between',
    borderColor: GREY,
    borderBottomWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  holidayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    alignItems: 'center',
    flex: 1,
    borderColor: GREY,
    borderRightWidth: 3,
  },
  holidayText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  boldDarkGrey: {
    fontWeight: 'bold',
    color: DARKGREY,
  },
  darkGrey: {
    color: DARKGREY,
  },
  darkGreyPadding: {
    color: DARKGREY,
    paddingBottom: 5,
    paddingLeft: 2,
  },
});

export default styles;
