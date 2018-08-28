import { Alert } from 'react-native';
import { fetchMonthEvents, employeeEvents } from '../services/holidayService';
import { getUserProfile } from '../services/userService';
import deviceStorage from '../services/deviceStorage';

export const getMonthEvents = month => fetchMonthEvents(month)
  .then(res => res.data)
  .catch((e) => {
    Alert.alert(
      'Could not get user events',
      e.message,
    );
  });

export const getUserEvents = () => {
  try {
    return deviceStorage.getItem('user_id')
      .then(id => employeeEvents(id))
      .then(res => res.data);
  } catch (e) {
    return Alert.alert(
      'Could not get user id',
      e.message,
    );
  }
};

export const getRemainingHolidays = () => getUserProfile()
  .then(res => res.data.totalHolidays)
  .catch((e) => {
    Alert.alert(
      'Could not get total holidays',
      e.message,
    );
  });
