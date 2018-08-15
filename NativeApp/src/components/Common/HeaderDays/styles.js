import { StyleSheet } from 'react-native';
import { WHITE, GREY, LIGHTGREY } from '../../../styles/colors';

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 93,
    borderColor: LIGHTGREY,
    borderTopWidth: 0.7,
  },
  holidayContainer: {
    marginLeft: '7%',
    flex: 1,
  },
  holidayText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  h3: {
    color: GREY,
  },
  h1: {
    fontWeight: 'bold',
  },
  p: {
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingLeft: 2,
  },
});

export default styles;
