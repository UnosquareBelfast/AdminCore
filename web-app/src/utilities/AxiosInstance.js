import axios from 'axios';

const baseURL = process.env.DOMAIN;
const token = localStorage.getItem('id_token');

const instance = axios.create({
  baseURL,
  headers: {
    authorization: token ? 'Bearer ' + token : '',
  },
});

export default instance;
