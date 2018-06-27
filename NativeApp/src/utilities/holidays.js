import { Alert } from 'react-native';
import { getUserHolidays } from '../services/holidayService';
import { getUserProfile } from '../services/userService';

export const getTakenHolidays = () => getUserHolidays()
  .then(res => res.data)
  .catch((e) => {
    Alert.alert(
      'Could not get taken holidays',
      e.message,
    );
  });

export const getRemainingHolidays = () => getUserProfile()
  .then(res => res.data.totalHolidays)
  .catch((e) => {
    Alert.alert(
      'Could not get total holidays',
      e.message,
    );
  });
