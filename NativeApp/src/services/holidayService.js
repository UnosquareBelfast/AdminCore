import axios from '../utilities/AxiosInstance';

export const fetchEvents = date => axios.get(`/dashboard/getEmployeeEvents?date=${date}`);

export const requestHolidays = holidays => axios.post('/holidays/', holidays);

export const updateHolidayRequest = holiday => axios.put('/holidays/', holiday);

export const cancelHolidayRequest = holiday => axios.put('/holidays/cancelHoliday', holiday);
