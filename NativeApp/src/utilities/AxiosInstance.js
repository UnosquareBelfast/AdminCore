import axios from 'axios';
import Moment from 'moment';
import deviceStorage from '../services/deviceStorage';


const baseURL = 'http://192.168.99.100:8081';

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
      start: new Moment(hols.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      end: new Moment(hols.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
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
