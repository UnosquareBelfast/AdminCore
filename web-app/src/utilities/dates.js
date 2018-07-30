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
      event.eventStatus.eventStatusId === status ? getEventDayAmount(event) : 0;
  });
  return totalDays;
};

export const getDuration = (startDate, endDate) => {
  return Math.floor(moment.duration(endDate.diff(startDate)).asDays() + 1);
};

export const getDurationNotice = (startDate, endDate) => {
  let days = getDuration(startDate, endDate);
  let businessDays = 0;
  let date = new moment(startDate);
  while (days > 0) {
    if (date.isoWeekday() < 6) {
      businessDays += 1;
    }
    days -= 1;
    date = date.add(1, 'days');
  }
  return businessDays;
};

export const calculateDaysNotice = daysRequested => {
  if (daysRequested < 4) {
    return 10;
  } else if (daysRequested > 4 && daysRequested < 10) {
    return 20;
  } else if (daysRequested > 10) {
    return 40;
  } else {
    return 0;
  }
};
