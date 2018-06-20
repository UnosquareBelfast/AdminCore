import deviceStorage from './deviceStorage';
import axios from '../utilities/AxiosInstance';
import decode from 'jwt-decode';

export const userLogin = (email, password) => {
  return axios
    .post('authentication/login/', { email, password })
    .then(res => {
      let userData = decode(res.data.accessToken);
      deviceStorage.savekey('id_token', res.data.accessToken);
      deviceStorage.savekey('user_id', userData.sub);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};
