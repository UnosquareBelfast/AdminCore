import { Alert } from 'react-native';
import axios from '../utilities/AxiosInstance';

export const getHolidays = date => axios.get(`/dashboard/getEmployeeEvents?date=${date}`);

export const getUserHolidays = () => {
  try {
    return getHolidays('2018-08-01');
  } catch (e) {
    return Alert.alert(
      'Could not get user id',
      e.message,
    );
  }
};

export const requestHolidays = holidays => axios.post('/holidays/', holidays);

export const updateHolidayRequest = holiday => axios.put('/holidays/', holiday);

export const cancelHolidayRequest = holiday => axios.put('/holidays/cancelHoliday', holiday);
