import moment from 'moment';

export const monthToMonth = (date, action) => {
  switch (action) {
    case 'PREV':
      return moment(date)
        .subtract(1, 'month')
        .toDate();

    case 'NEXT':
      return moment(date)
        .add(1, 'month')
        .toDate();

    default:
      return date;
  }
};

export const dateFormat = date => moment(date).format('MMMM YYYY');