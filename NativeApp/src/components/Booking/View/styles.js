import { StyleSheet } from 'react-native';
import { LIGHTERBLACK } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 23,
    backgroundColor: '#fff',
  },
  dateForm: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  formLabel: {
    marginLeft: 0,
    fontSize: 12,
    fontWeight: 'normal',
    color: LIGHTERBLACK,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    padding: 0,
  },
  checkText: {
    fontSize: 12,
    color: LIGHTERBLACK,
    fontWeight: 'normal'
  },
  holidayStatus: {
    backgroundColor: '#f7f7f7',
    borderLeftWidth: 10,
    borderLeftColor: '#00DCFA',
    padding: 10,
    marginTop: 20,
  },
});

export default styles;
