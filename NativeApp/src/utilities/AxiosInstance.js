import { AsyncStorage } from 'react-native';
import axios from 'axios';

//Use http://10.0.2.2:8081/ on android emulator
const baseURL = process.env.DOMAIN;


const instance = axios.create({
  baseURL,
});


instance.interceptors.request.use(function(config) {
  config.headers.Authorization = `Bearer ${AsyncStorage.getItem('id_token')}`;
  return config;
});

export default instance;
