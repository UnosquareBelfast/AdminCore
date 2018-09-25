import moment from 'moment';
import holidayStatus from './holidayStatus';

const currYear = new Date().getFullYear();

// Add mandatory events here. The only fields that need change are title and the dates.
const mandatoryEvents = [
  {
    title: 'Christmas Day',
    mandatoryDate: `${currYear}-12-25`,
  },
  {
    title: 'New Years Day',
    mandatoryDate: `${currYear}-12-31`,
  },
  {
    title: 'Memorial Day',
    mandatoryDate: `${currYear}-05-28`,
  },
];

export default mandatoryEvents.map(event => {
  return {
    // Format the events
    title: event.title,
    start: new moment([event.mandatoryDate], 'YYYY-MM-DD'),
    end: new moment([event.mandatoryDate], 'YYYY-MM-DD'),

    //Add the event boilerplate
    eventId: -1,
    allDay: true,
    halfDay: false,
    employee: null,
    eventStatus: {
      eventStatusId: holidayStatus.MANDATORY,
      description: 'Mandatory',
    },
    eventType: {
      eventTypeId: holidayStatus.PENDING,
      description: 'Annual leave',
    },
  };
});
