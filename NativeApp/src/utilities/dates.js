import moment from 'moment';

const getDuration = (startDate, endDate) => moment(endDate).diff(startDate, 'days') + 1;

export default getDuration;
