import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    backgroundColor: '#f7f7f7',
  },
  dateForm: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowRadius: 2,
    shadowColor: 'lightgrey',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  formLabel: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'normal',
    color: GREY,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
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
  },
});

export default styles;
