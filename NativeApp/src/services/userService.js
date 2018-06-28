import { Alert } from 'react-native';
import decode from 'jwt-decode';
import deviceStorage from './deviceStorage';
import axios from '../utilities/AxiosInstance';

export const userLogin = (email, password) => axios
  .post('authentication/login/', { email, password })
  .then((res) => {
    const userData = decode(res.data.accessToken);
    deviceStorage.savekey('id_token', res.data.accessToken);
    deviceStorage.savekey('user_id', userData.sub);
  })
  .catch(error => Promise.reject(error));

export const getUserProfile = () => {
  try {
    return deviceStorage.getItem('user_id')
      .then(id => axios.get(`employees/${id}/`))
      .catch(e => Alert.alert('Could not get employee info', e.message));
  } catch (e) {
    return Alert.alert(
      'Could not get user id',
      e.message,
    );
  }
};
