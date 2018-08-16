import { StyleSheet } from 'react-native';
import { WHITE, GREY, LIGHTGREY } from '../../../styles/colors';

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingTop: 11,
    paddingBottom: 11,
    maxHeight: 70,
    borderColor: LIGHTGREY,
    borderTopWidth: 0.7,
  },
  holidayContainer: {
    marginLeft: '5%',
    flex: 1,
    borderTopWidth: 1,
    borderColor: LIGHTGREY,
  },
  holidayText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  h2: {
    color: GREY,
  },
  h1: {
    fontWeight: 'bold',
  },
  p: {
    fontWeight: 'bold',
    paddingBottom: 2,
    paddingLeft: 2,
  },
});

export default styles;
