import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseURL = 'http://localhost:8081/';

const instance = axios.create({
  baseURL,
});


instance.interceptors.request.use(function(config) {
  config.headers.Authorization = `Bearer ${AsyncStorage.getItem('id_token')}`;
  return config;
});

export default instance;