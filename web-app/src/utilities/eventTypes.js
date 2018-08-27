import holidayStatus from './holidayStatus';

const eventTypes = {
  ANNUAL_LEAVE: 1,
  WFH: 2,
  SICK: 3,
  TRAVEL: 4,
};

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

export default eventTypes;
