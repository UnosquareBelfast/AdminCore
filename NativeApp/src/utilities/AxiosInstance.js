import axios from 'axios';
import Moment from 'moment';
import deviceStorage from '../services/deviceStorage';


// Use http://10.0.2.2:8081/ on android emulator
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

instance.interceptors.response.use((response) => {
  if (response.config.url.includes(`${baseURL}/holidays/findByEmployeeId`)) {
    const holidays = [...response.data];
    const updatedHolidays = holidays.map(hols => ({
      ...hols,
      start: new Moment(hols.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      end: new Moment(hols.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      requested: new Moment(hols.dateCreated, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    }));

    return {
      ...response,
      data: updatedHolidays,
    };
  }
  return response;
});

export default instance;
