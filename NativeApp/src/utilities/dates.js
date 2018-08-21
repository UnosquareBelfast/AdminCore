import moment from 'moment';

export const getDuration = (startDate, endDate) => {
  return moment(endDate).diff(startDate, 'days') + 1;
};