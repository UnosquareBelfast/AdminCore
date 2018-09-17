import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendar, faHome } from '@fortawesome/fontawesome-free-solid';

export default {
  ANNUAL_LEAVE: 1,
  WFH: 2,
};

export const typeText = [null, 'Annual leave', 'Working remotely'];

export const typeIcons = [
  null,
  <FontAwesomeIcon icon={faCalendar} />,
  <FontAwesomeIcon icon={faHome} />,
];
