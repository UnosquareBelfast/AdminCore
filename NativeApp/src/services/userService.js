import { Alert } from 'react-native';
import decode from 'jwt-decode';
import deviceStorage from './deviceStorage';
import axios from '../utilities/AxiosInstance';
import takenHolidays from '../utilities/holidays';

export const userLogin = (email, password) => axios
  .post('authentication/login/', { email, password })
  .then((res) => {
    const userData = decode(res.data.accessToken);
    deviceStorage.savekey('id_token', res.data.accessToken);
    deviceStorage.savekey('user_id', userData.sub);
  })
  .catch(error => Promise.reject(error));

export const getUserHolidays = () => {
  try {
    return deviceStorage.getItem('user_id')
      .then(id => takenHolidays(id));
  } catch (e) {
    return Alert.alert(
      'Could not get user id',
      e.message,
    );
  }
};
