import { Alert } from 'react-native';
import axios from '../utilities/AxiosInstance';
import deviceStorage from './deviceStorage';

export const getHolidays = employeeId => axios.get(`/holidays/findByEmployeeId/${employeeId}`);

export const getUserHolidays = () => {
  try {
    return deviceStorage.getItem('user_id')
      .then(id => getHolidays(id));
  } catch (e) {
    return Alert.alert(
      'Could not get user id',
      e.message,
    );
  }
};
