import deviceStorage from './deviceStorage';
import axios from '../utilities/AxiosInstance';

export const userLogin = (email, password) => {
  return axios
    .post('authentication/login/', { email, password })
    .then(res => {
      deviceStorage.savekey('id_token', res.data.accessToken);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};
