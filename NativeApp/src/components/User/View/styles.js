import { StyleSheet } from 'react-native';
import { WHITE, UNOBLUE, LIGHTGREY } from '../../../styles/colors';
import { container } from '../../../styles/layout';

const styles = StyleSheet.create({
  container: { ...container },
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  width1: {
    width: '40%',
    borderWidth: 1,
    borderColor: WHITE,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  width2: {
    width: '25%',
    borderWidth: 1,
    borderColor: WHITE,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  holidayStatus: {
    backgroundColor: LIGHTGREY,
    borderLeftWidth: 10,
    borderLeftColor: UNOBLUE,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  profileName: {
    paddingBottom: 10,
    paddingTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  flatListView: {
    flex: 1,
  },
  H3Bold: {
    fontWeight: 'bold',
  },
});

export default styles;
