import moment from 'moment';

export const getEventDayAmount = event => {
  if (!event) return;
  if (event.halfDay) return 0.5;
  const start = event.start.startOf('day');
  const end = event.end.endOf('day');
  end.add(1, 'ms');
  const diff = Math.abs(start.diff(end));
  const duration = moment.duration(diff);
  end.subtract(1, 'ms');
  return duration.get('days');
};

export const getTotalDaysInEventArray = events => {
  if (!events) return;
  let totalDays = 0;
  events.forEach(event => {
    totalDays += getEventDayAmount(event);
  });
  return totalDays;
};

export const getTotalDaysInEventArrayWithStatus = (events, status) => {
  if (!events) return;
  let totalDays = 0;
  events.forEach(event => {
    totalDays +=
      event.holidayStatusId === status ? getEventDayAmount(event) : 0;
  });
  return totalDays;
};
