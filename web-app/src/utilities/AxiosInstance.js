import axios from 'axios';
import moment from 'moment';
import store from '../store';

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

  if (response.config.url.includes(`${baseURL}/holidays`)) {
    const holidays = [...response.data];
    for (const index in holidays) {
      holidays[index].start = new moment(
        holidays[index].startDate,
        'YYYY-MM-DD'
      );
      holidays[index].end = new moment(holidays[index].endDate, 'YYYY-MM-DD');
      holidays[index].created = new moment(
        holidays[index].dateCreated,
        'YYYY-MM-DD'
      );
    }
    return {
      ...response,
      data: holidays,
    };
  }

  // Append employee to each event (we know its the logged in user) and convert
  // dates to moment objects
  if (response.config.url.includes(`${baseURL}/dashboard/getEmployeeEvents`)) {
    const events = [...response.data.events];
    const employee = store.getState().USER;
    for (let event of events) {
      // Raw dates to moment objects
      event.start = new moment(event.startDate, 'YYYY-MM-DD');
      event.end = new moment(event.endDate, 'YYYY-MM-DD');
      // Append logged in employee
      event.employee = { ...employee };
    }
    return {
      ...response,
      data: events,
    };
  }

  return response;
});

export default instance;
