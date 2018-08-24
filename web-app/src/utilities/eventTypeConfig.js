import holidayStatus from './holidayStatus';
import eventTypes from './eventTypes';

export const getEventTypeValue = (eventTypeId, eventStatusId) => {
  if (eventTypeId === eventTypes.ANNUAL_LEAVE) {
    return eventStatusId;
  } else if (eventTypeId === eventTypes.WFH) {
    return holidayStatus.WFH;
  } else if (eventTypeId === eventTypes.SICK) {
    return holidayStatus.SICK;
  } else if (eventTypeId === eventTypes.WRT) {
    return holidayStatus.WRT;
  }
};
