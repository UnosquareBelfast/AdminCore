import axios from 'axios';
import deviceStorage from '../services/deviceStorage';


//Use http://10.0.2.2:8081/ on android emulator
const baseURL = process.env.DOMAIN;


const instance = axios.create({
  baseURL,
});


instance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${await deviceStorage.getItem('id_token')}`;
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
