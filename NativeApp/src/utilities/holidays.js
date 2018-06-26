import { Alert } from 'react-native';
import { getHolidays } from '../services/holidayService';

const getTakenHolidays = id => getHolidays(id)
  .then(res => res.data)
  .catch((e) => {
    Alert.alert(
      'Could not get taken holidays',
      e.message,
    );
  });

export default getTakenHolidays;
