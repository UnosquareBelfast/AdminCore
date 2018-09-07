import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faClock,
  faSun,
  faCalendarTimes,
  faCalendarCheck,
} from '@fortawesome/fontawesome-free-solid';

export default {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  CANCELLED: 4,
  MANDATORY: 5,
};

export const statusText = [
  null,
  'Pending',
  'Approved',
  'Rejected',
  'Cancelled',
  'Mandatory',
];

export const statusIcons = [
  null,
  <FontAwesomeIcon icon={faClock} />,
  <FontAwesomeIcon icon={faCalendarCheck} />,
  <FontAwesomeIcon icon={faCalendarTimes} />,
  <FontAwesomeIcon icon={faCalendarTimes} />,
  <FontAwesomeIcon icon={faSun} />,
];
