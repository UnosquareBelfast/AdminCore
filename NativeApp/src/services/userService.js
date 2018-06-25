import decode from 'jwt-decode';
import deviceStorage from './deviceStorage';
import axios from '../utilities/AxiosInstance';

const userLogin = (email, password) => axios
  .post('authentication/login/', { email, password })
  .then((res) => {
    const userData = decode(res.data.accessToken);
    deviceStorage.savekey('id_token', res.data.accessToken);
    deviceStorage.savekey('user_id', userData.sub);
  })
  .catch(error => Promise.reject(error));

export default userLogin;
