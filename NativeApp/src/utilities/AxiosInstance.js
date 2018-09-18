import axios from 'axios';
import Moment from 'moment';
import deviceStorage from '../services/deviceStorage';


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
  const mapEvents = (events) => {
    const updatedEvents = events.map(event => ({
      ...event,
      start: new Moment(event.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      end: new Moment(event.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      requested: new Moment(event.dateCreated, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    }));
    return updatedEvents;
  };

  if (response.config.url.includes(`${baseURL}/holidays/findByEmployeeId`)) {
    const events = [...response.data];
    const updatedAllEvents = mapEvents(events);

    return {
      ...response,
      data: updatedAllEvents,
    };
  }

  if (response.config.url.includes(`${baseURL}/dashboard/getEmployeeEvents`)) {
    const events = [...response.data.events];
    const updatedMonthEvents = mapEvents(events);

    return {
      ...response,
      data: updatedMonthEvents,
    };
  }
  return response;
});

export default instance;
