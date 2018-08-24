import { Alert } from 'react-native';
import { fetchEvents } from '../services/holidayService';
import { getUserProfile } from '../services/userService';

export const getUserEvents = month => fetchEvents(month)
  .then(res => res.data)
  .catch((e) => {
    Alert.alert(
      'Could not get user events',
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
