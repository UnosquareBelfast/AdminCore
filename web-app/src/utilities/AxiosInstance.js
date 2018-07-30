import axios from 'axios';
import moment from 'moment';

//const baseURL = process.env.DOMAIN;
const baseURL = 'http://localhost:8081';

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
      holidays[index].employee = {
        employeeId: holidays[index].employeeId,
        forename: 'Test',
        surname: 'User',
        email: 'test@user.com',
        totalHolidays: 33,
        startDate: [2014, 1, 1],
        countryId: 1,
        employeeRoleId: 2,
        employeeStatusId: 2,
      };

      holidays[index].start = new moment(
        holidays[index].startDate,
        'YYYY-MM-DD',
      );
      holidays[index].end = new moment(holidays[index].endDate, 'YYYY-MM-DD');
      holidays[index].requested = new moment(
        holidays[index].dateCreated,
        'YYYY-MM-DD',
      );
    }
    return {
      ...response,
      data: holidays,
    };
  }
  return response;
});

export default instance;
