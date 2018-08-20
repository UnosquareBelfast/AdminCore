import { StyleSheet } from 'react-native';
import { WHITE, UNOBLUE, LIGHTGREY, GREY, SHADOW } from '../../../styles/colors';
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
    backgroundColor: WHITE,
    borderLeftWidth: 10,
    borderLeftColor: UNOBLUE,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowRadius: 3,
    shadowColor: SHADOW,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  holidayDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  endDate: {
    paddingLeft: 100,
  },
  profileName: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: LIGHTGREY,
  },
  flatListView: {
    flex: 1,
  },
  holidayText: {
    color: GREY,
    marginBottom: 15,
  },
});

export default styles;
