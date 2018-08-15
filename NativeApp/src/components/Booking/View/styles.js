import { StyleSheet } from 'react-native';
import { GREY, WHITE } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    backgroundColor: WHITE,
  },
  dateForm: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  formLabel: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'normal',
    color: GREY,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingTop: 10,
  },
  checkText: {
    fontSize: 12,
    color: GREY,
    fontWeight: 'normal',
  },
  holidayStatus: {
    backgroundColor: '#f7f7f7',
    borderLeftWidth: 10,
    borderLeftColor: '#00DCFA',
    padding: 10,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
});

export default styles;
