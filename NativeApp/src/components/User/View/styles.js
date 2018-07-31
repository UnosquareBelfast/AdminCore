import { StyleSheet } from 'react-native';
import colours from '../../../utilities/globalStyles/theme';

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  width1: {
    width: '40%',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  width2: {
    width: '25%',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  holidayStatus: {
    backgroundColor: '#f7f7f7',
    borderLeftWidth: 10,
    borderLeftColor: colours.unoBlue,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default styles;
