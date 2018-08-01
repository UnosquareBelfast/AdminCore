import { StyleSheet } from 'react-native';
import colours from '../../../utilities/globalStyles/theme';

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colours.lightGrey,
    paddingTop: 8,
    paddingBottom: 8,
    maxHeight: 93,
    justifyContent: 'space-between',
    borderColor: colours.grey,
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
    borderColor: colours.grey,
    borderRightWidth: 3,
  },
  holidayText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  boldDarkGrey: {
    fontWeight: 'bold',
    color: colours.darkGrey,
  },
  darkGrey: {
    color: colours.darkGrey,
  },
  darkGreyPadding: {
    color: colours.darkGrey,
    paddingBottom: 5,
    paddingLeft: 2,
  },
});

export default styles;
