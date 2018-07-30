import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  dateForm: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
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
