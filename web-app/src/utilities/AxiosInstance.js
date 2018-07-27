import axios from 'axios';
import moment from 'moment';

const baseURL = process.env.DOMAIN;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(function(config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
  return config;
});

instance.interceptors.response.use(function(response) {
  // Adds start, end & requested to response which are in moment format
  if (response.config.method != 'get') {
    return response;
  }

  return response;
});

export default instance;
